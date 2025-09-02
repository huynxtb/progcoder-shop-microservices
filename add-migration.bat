@echo off
chcp 65001
setlocal enabledelayedexpansion

:main
cls
echo.
echo ==== Select a service ====
echo  1. Inventory
echo  2. Customer
echo.
set /p userChoice=Enter your choice (1-2): 

if "%userChoice%"=="1" (
    set serviceName=Inventory
) else if "%userChoice%"=="2" (
    set serviceName=Customer
) else (
    echo Invalid choice. Exiting...
    goto end
)

echo.
echo Your service: %serviceName%
echo.
set /p migrationName=Enter migration name: 

:: Enter the chosen service folder
cd /d "src\Services\%serviceName%"

echo.
echo -- Ensure dotnet-ef is installed --
dotnet tool install --global dotnet-ef

echo.
echo -- Creating migration "%migrationName%" --

dotnet ef migrations add "%migrationName%" --project Infrastructure --startup-project API --output-dir Data\Migrations

echo -- Updating database --

dotnet ef database update --project Infrastructure --startup-project API

echo.
	
:end
pause
