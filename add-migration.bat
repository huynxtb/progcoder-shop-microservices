@echo off
chcp 65001
setlocal enabledelayedexpansion

:main
cls
echo.
echo ==== Select a service ====
echo  1. User
echo  2. Payment
echo  3. Order
echo.
set /p userChoice=Enter your choice (1-2): 

if "%userChoice%"=="1" (
    set serviceName=User
) else if "%userChoice%"=="2" (
    set serviceName=Payment
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
echo -- Creating migration "%migrationName%" for WriteDbContext and ReadDbContext (separate folders) --
for %%C in (WriteDbContext ReadDbContext) do (
    echo.
    echo --- Context: %%C ---
    set targetFolder=%%C%serviceName%
    mkdir "Data\Migrations\!targetFolder!" 2>nul
    dotnet ef migrations add "%migrationName%" ^
        --context %%C ^
        --project Infrastructure ^
        --startup-project API ^
        --output-dir "Data\Migrations\!targetFolder!"
)

echo.
	
:end
pause
