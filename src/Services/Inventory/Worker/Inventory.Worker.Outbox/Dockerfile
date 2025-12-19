# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
USER $APP_UID
WORKDIR /app


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Directory.Packages.props", "src/"]
COPY ["src/Directory.Build.props", "src/"]
COPY ["src/Services/Inventory/Worker/Inventory.Worker.Outbox/Inventory.Worker.Outbox.csproj", "src/Services/Inventory/Worker/Inventory.Worker.Outbox/"]
COPY ["src/Shared/BuildingBlocks/BuildingBlocks.csproj", "src/Shared/BuildingBlocks/"]
COPY ["src/Shared/Common/Common.csproj", "src/Shared/Common/"]
COPY ["src/Shared/EventSourcing/EventSourcing.csproj", "src/Shared/EventSourcing/"]
COPY ["src/Services/Inventory/Core/Inventory.Domain/Inventory.Domain.csproj", "src/Services/Inventory/Core/Inventory.Domain/"]
COPY ["src/Services/Inventory/Core/Inventory.Infrastructure/Inventory.Infrastructure.csproj", "src/Services/Inventory/Core/Inventory.Infrastructure/"]
COPY ["src/Services/Inventory/Core/Inventory.Application/Inventory.Application.csproj", "src/Services/Inventory/Core/Inventory.Application/"]
RUN dotnet restore "./src/Services/Inventory/Worker/Inventory.Worker.Outbox/Inventory.Worker.Outbox.csproj"
COPY . .
WORKDIR "/src/src/Services/Inventory/Worker/Inventory.Worker.Outbox"
RUN dotnet build "./Inventory.Worker.Outbox.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Inventory.Worker.Outbox.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Inventory.Worker.Outbox.dll"]