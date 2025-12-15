#!/bin/bash

# Store the initial directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

main() {
    # Always return to the script directory at the beginning of main
    cd "$SCRIPT_DIR" || exit

    clear
    echo ""
    echo "==== Select a service ===="
    echo " 1. Inventory"
    echo " 2. Order"
    echo " 0. Exit"
    echo ""
    read -p "Enter your choice (1-2 or 0): " userChoice

    case $userChoice in
        1)
            serviceName="Inventory"
            infrastructureProject="Inventory.Infrastructure"
            apiProject="Inventory.Api"
            serviceDir="src/Services/Inventory/Core"
            process_migration
            ;;
        2)
            serviceName="Order"
            infrastructureProject="Order.Infrastructure"
            apiProject="Order.Api"
            serviceDir="src/Services/Order/Core"
            process_migration
            ;;
        0)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo ""
            echo "[ERROR] Invalid choice '$userChoice'. Please select 1, 2, or 0."
            echo ""
            read -p "Press Enter to continue..."
            main
            ;;
    esac
}

process_migration() {
    echo ""
    echo "Your service: $serviceName"
    echo "Infrastructure project: $infrastructureProject"
    echo "API project: $apiProject"
    echo "Service directory: $serviceDir"
    echo ""
    read -p "Enter migration name: " migrationName

    if [ -z "$migrationName" ]; then
        echo ""
        echo "[ERROR] Migration name cannot be empty."
        echo ""
        read -p "Press Enter to continue..."
        main
        return
    fi

    echo ""
    echo "-- Navigating from $(pwd) to $serviceDir --"
    cd "$SCRIPT_DIR/$serviceDir" || {
        echo "[ERROR] Failed to navigate to $serviceDir"
        read -p "Press Enter to continue..."
        main
        return
    }

    echo "Current directory after navigation: $(pwd)"

    if [ ! -d "$infrastructureProject" ]; then
        echo ""
        echo "[ERROR] Infrastructure project '$infrastructureProject' not found in current directory."
        echo "Expected directory: $(pwd)/$infrastructureProject"
        echo ""
        echo "Contents of current directory:"
        ls -la
        echo ""
        read -p "Press Enter to continue..."
        main
        return
    fi

    echo ""
    echo "-- Ensure dotnet-ef is installed --"

    dotnet tool install --global dotnet-ef --version 8.0.6 2>/dev/null || echo "dotnet-ef already installed or installation skipped"

    echo ""
    echo "-- Creating migration '$migrationName' for $serviceName service --"

    dotnet ef migrations add "$migrationName" \
        --project "$infrastructureProject" \
        --startup-project "../Api/$apiProject" \
        --output-dir Data/Migrations

    if [ $? -ne 0 ]; then
        echo ""
        echo "[ERROR] Failed to create migration. Please check the error messages above."
        echo ""
        read -p "Press Enter to continue..."
        main
        return
    fi

    echo ""
    echo "-- Updating database for $serviceName service --"

    dotnet ef database update \
        --project "$infrastructureProject" \
        --startup-project "../Api/$apiProject"

    if [ $? -ne 0 ]; then
        echo ""
        echo "[ERROR] Failed to update database. Please check the error messages above."
        echo ""
        read -p "Press Enter to continue..."
        main
        return
    fi

    echo ""
    echo "[SUCCESS] Migration completed successfully for $serviceName service!"
    echo ""
    read -p "Do you want to create another migration? (y/n): " continue

    case ${continue,,} in
        y|yes)
            echo ""
            echo "-- Returning to script directory: $SCRIPT_DIR --"
            cd "$SCRIPT_DIR" || exit
            main
            ;;
        *)
            echo ""
            echo "-- Returning to script directory: $SCRIPT_DIR --"
            cd "$SCRIPT_DIR" || exit
            echo "Thank you for using the migration script!"
            ;;
    esac
}

# Run main function
main

