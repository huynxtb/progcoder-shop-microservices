@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

REM Store the script directory
set "SCRIPT_DIR=%~dp0"

:main_menu
cls
echo.
echo ==== Select a service ====
echo  1. Inventory
echo  2. Order
echo  0. Exit
echo.

set /p choice="Enter your choice (1-2, 0 to exit): "

if "%choice%"=="1" goto inventory
if "%choice%"=="2" goto order
if "%choice%"=="0" goto exit
echo.
echo [ERROR] Invalid choice '%choice%'. Please select 1, 2, or 0.
echo.
pause
goto main_menu

:inventory
cd /d "%SCRIPT_DIR%"
call :process_migration "Inventory" "Inventory.Infrastructure" "Inventory.Api" "src\Services\Inventory\Core"
if errorlevel 1 goto main_menu
set /p continue="Do you want to create another migration? (y/n): "
if /i not "%continue%"=="y" goto exit
goto main_menu

:order
cd /d "%SCRIPT_DIR%"
call :process_migration "Order" "Order.Infrastructure" "Order.Api" "src\Services\Order\Core"
if errorlevel 1 goto main_menu
set /p continue="Do you want to create another migration? (y/n): "
if /i not "%continue%"=="y" goto exit
goto main_menu

:process_migration
set "ServiceName=%~1"
set "InfrastructureProject=%~2"
set "ApiProject=%~3"
set "ServiceDir=%~4"

echo.
echo Your service: %ServiceName%
echo Infrastructure project: %InfrastructureProject%
echo API project: %ApiProject%
echo Service directory: %ServiceDir%
echo.

set /p migrationName="Enter migration name: "

if "%migrationName%"=="" (
    echo.
    echo [ERROR] Migration name cannot be empty.
    echo.
    pause
    exit /b 1
)

REM Navigate to service directory
echo.
echo -- Navigating to %ServiceDir% --
cd /d "%SCRIPT_DIR%%ServiceDir%"
echo Current directory: %CD%

REM Check if infrastructure project exists
if not exist "%InfrastructureProject%" (
    echo.
    echo [ERROR] Infrastructure project '%InfrastructureProject%' not found in current directory.
    echo Expected directory: %CD%\%InfrastructureProject%
    echo.
    echo Contents of current directory:
    dir /b
    echo.
    pause
    exit /b 1
)

REM Ensure dotnet-ef is installed
echo.
echo -- Ensure dotnet-ef is installed --
echo.
dotnet tool install --global dotnet-ef --version 8.0.6 >nul 2>&1

REM Create migration
echo.
echo -- Creating migration '%migrationName%' for %ServiceName% service --
echo.

dotnet ef migrations add %migrationName% --project %InfrastructureProject% --startup-project ..\Api\%ApiProject% --output-dir Data\Migrations

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to create migration. Please check the error messages above.
    echo.
    pause
    exit /b 1
)

REM Update database
echo.
echo -- Updating database for %ServiceName% service --
echo.

dotnet ef database update --project %InfrastructureProject% --startup-project ..\Api\%ApiProject%

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to update database. Please check the error messages above.
    echo.
    pause
    exit /b 1
)

REM Success
echo.
echo [SUCCESS] Migration completed successfully for %ServiceName% service!
echo.

exit /b 0

:exit
cd /d "%SCRIPT_DIR%"
echo.
echo -- Returning to script directory: %SCRIPT_DIR% --
echo Thank you for using the migration script!
echo.
echo Press any key to continue...
pause >nul
