@echo off
chcp 65001
setlocal enabledelayedexpansion

:: Store the initial directory where the script is located
set SCRIPT_DIR=%cd%

echo.
echo ============================================
echo    Database Migration Runner
echo ============================================
echo.

:main
cd /d "%SCRIPT_DIR%"

echo -- Ensuring dotnet-ef is installed --
dotnet tool install --global dotnet-ef --version 8.0.6 >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo dotnet-ef already installed
)
echo.

set success_count=0
set fail_count=0

:: Apply migrations for Inventory service
call :apply_migration "Inventory" "src\Services\Inventory\Core" "Inventory.Infrastructure" "Inventory.Api"
if %ERRORLEVEL% equ 0 (
    set /a success_count+=1
) else (
    set /a fail_count+=1
)

:: Return to script directory
cd /d "%SCRIPT_DIR%"

:: Apply migrations for Order service
call :apply_migration "Order" "src\Services\Order\Core" "Order.Infrastructure" "Order.Api"
if %ERRORLEVEL% equ 0 (
    set /a success_count+=1
) else (
    set /a fail_count+=1
)

:: Return to script directory
cd /d "%SCRIPT_DIR%"

echo.
echo ============================================
echo    Migration Summary
echo ============================================
echo    Successful: %success_count%
echo    Failed: %fail_count%
echo ============================================
echo.

if %fail_count% equ 0 (
    echo [SUCCESS] All database migrations completed successfully!
) else (
    echo [WARNING] Some migrations failed. Please check the errors above.
)

pause
goto :eof

:apply_migration
set serviceName=%~1
set serviceDir=%~2
set infrastructureProject=%~3
set apiProject=%~4

echo.
echo -- Processing %serviceName% Service --
echo    Service directory: %serviceDir%
echo    Infrastructure: %infrastructureProject%
echo    API: %apiProject%
echo.

cd /d "%SCRIPT_DIR%\%serviceDir%"

if not exist "%infrastructureProject%" (
    echo [ERROR] Infrastructure project "%infrastructureProject%" not found
    exit /b 1
)

echo -- Updating database for %serviceName% service --

dotnet ef database update --project %infrastructureProject% --startup-project ..\Api\%apiProject%

if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to update database for %serviceName% service
    exit /b 1
)

echo [SUCCESS] Database updated successfully for %serviceName% service!
exit /b 0

