@echo off
chcp 65001
setlocal enabledelayedexpansion

:: Store the initial directory where the script is located
set SCRIPT_DIR=%cd%

:main
:: Always return to the script directory at the beginning of main
cd /d "%SCRIPT_DIR%"

cls
echo.
echo ==== Select a service ====
echo  1. Inventory
echo  2. Order
echo  3. Exit
echo.
set /p userChoice=Enter your choice (1-3): 

if "%userChoice%"=="1" (
    set serviceName=Inventory
    set infrastructureProject=Inventory.Infrastructure
    set apiProject=Inventory.Api
    set serviceDir=src\Services\Inventory\Core
    goto process_migration
) else if "%userChoice%"=="2" (
    set serviceName=Order
    set infrastructureProject=Order.Infrastructure
    set apiProject=Order.Api
    set serviceDir=src\Services\Order\Core
    goto process_migration
) else if "%userChoice%"=="3" (
    echo Exiting...
    goto end
) else (
    echo.
    echo [ERROR] Invalid choice "%userChoice%". Please select 1, 2, or 3.
    echo.
    pause
    goto main
)

:process_migration
echo.
echo Your service: %serviceName%
echo Infrastructure project: %infrastructureProject%
echo API project: %apiProject%
echo Service directory: %serviceDir%
echo.
set /p migrationName=Enter migration name: 

if "%migrationName%"=="" (
    echo.
    echo [ERROR] Migration name cannot be empty.
    echo.
    pause
    goto main
)

echo.
echo -- Navigating from %cd% to %serviceDir% --
cd /d "%serviceDir%"

echo Current directory after navigation: %cd%

if not exist "%infrastructureProject%" (
    echo.
    echo [ERROR] Infrastructure project "%infrastructureProject%" not found in current directory.
    echo Expected directory: %cd%\%infrastructureProject%
    echo.
    echo Contents of current directory:
    dir /b
    echo.
    pause
    goto main
)

echo.
echo -- Ensure dotnet-ef is installed --
dotnet tool install --global dotnet-ef

echo.
echo -- Creating migration "%migrationName%" for %serviceName% service --

dotnet ef migrations add "%migrationName%" --project %infrastructureProject% --startup-project ..\Api\%apiProject% --output-dir Data\Migrations

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Failed to create migration. Please check the error messages above.
    echo.
    pause
    goto main
)

echo.
echo -- Updating database for %serviceName% service --

dotnet ef database update --project %infrastructureProject% --startup-project ..\Api\%apiProject%

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Failed to update database. Please check the error messages above.
    echo.
    pause
    goto main
)

echo.
echo [SUCCESS] Migration completed successfully for %serviceName% service!
echo.
set /p continue=Do you want to create another migration? (y/n): 

if /i "%continue%"=="y" (
    echo.
    echo -- Returning to script directory: %SCRIPT_DIR% --
    cd /d "%SCRIPT_DIR%"
    goto main
) else if /i "%continue%"=="yes" (
    echo.
    echo -- Returning to script directory: %SCRIPT_DIR% --
    cd /d "%SCRIPT_DIR%"
    goto main
)

:end
echo.
echo -- Returning to script directory: %SCRIPT_DIR% --
cd /d "%SCRIPT_DIR%"
echo Thank you for using the migration script!
pause
