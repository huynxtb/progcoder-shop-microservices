@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo.
echo ============================================
echo    Database Migration Runner
echo ============================================
echo.

REM Store the script directory
set "SCRIPT_DIR=%~dp0"

REM Ensure dotnet-ef is installed
echo -- Ensuring dotnet-ef is installed --
dotnet tool install --global dotnet-ef --version 8.0.6 >nul 2>&1
if errorlevel 1 (
    echo dotnet-ef already installed
) else (
    echo dotnet-ef installed successfully
)
echo.

REM Initialize counters
set "successCount=0"
set "failCount=0"

REM Function to apply migration for Inventory service
echo.
echo -- Processing Inventory Service --
echo    Service directory: src\Services\Inventory\Core
echo    Infrastructure: Inventory.Infrastructure
echo    API: Inventory.Api
echo.

cd /d "%SCRIPT_DIR%src\Services\Inventory\Core"

if not exist "Inventory.Infrastructure" (
    echo [ERROR] Infrastructure project 'Inventory.Infrastructure' not found
    set /a failCount+=1
    goto order_migration
)

echo -- Updating database for Inventory service --
dotnet ef database update --project Inventory.Infrastructure --startup-project ..\Api\Inventory.Api

if errorlevel 1 (
    echo [ERROR] Failed to update database for Inventory service
    set /a failCount+=1
) else (
    echo [SUCCESS] Database updated successfully for Inventory service!
    set /a successCount+=1
)

:order_migration
REM Return to script directory
cd /d "%SCRIPT_DIR%"

REM Function to apply migration for Order service
echo.
echo -- Processing Order Service --
echo    Service directory: src\Services\Order\Core
echo    Infrastructure: Order.Infrastructure
echo    API: Order.Api
echo.

cd /d "%SCRIPT_DIR%src\Services\Order\Core"

if not exist "Order.Infrastructure" (
    echo [ERROR] Infrastructure project 'Order.Infrastructure' not found
    set /a failCount+=1
    goto summary
)

echo -- Updating database for Order service --
dotnet ef database update --project Order.Infrastructure --startup-project ..\Api\Order.Api

if errorlevel 1 (
    echo [ERROR] Failed to update database for Order service
    set /a failCount+=1
) else (
    echo [SUCCESS] Database updated successfully for Order service!
    set /a successCount+=1
)

:summary
REM Return to script directory
cd /d "%SCRIPT_DIR%"

REM Display summary
echo.
echo ============================================
echo    Migration Summary
echo ============================================
echo    Successful: %successCount%
echo    Failed: %failCount%
echo ============================================
echo.

if %failCount% EQU 0 (
    echo [SUCCESS] All database migrations completed successfully!
) else (
    echo [WARNING] Some migrations failed. Please check the errors above.
)

echo.
echo Press any key to continue...
pause >nul
