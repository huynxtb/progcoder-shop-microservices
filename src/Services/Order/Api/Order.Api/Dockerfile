# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Directory.Packages.props", "src/"]
COPY ["src/Directory.Build.props", "src/"]
COPY ["src/Services/Order/Api/Order.Api/Order.Api.csproj", "src/Services/Order/Api/Order.Api/"]
COPY ["src/Shared/Common/Common.csproj", "src/Shared/Common/"]
COPY ["src/Services/Order/Core/Order.Application/Order.Application.csproj", "src/Services/Order/Core/Order.Application/"]
COPY ["src/Shared/BuildingBlocks/BuildingBlocks.csproj", "src/Shared/BuildingBlocks/"]
COPY ["src/Shared/EventSourcing/EventSourcing.csproj", "src/Shared/EventSourcing/"]
COPY ["src/Services/Order/Core/Order.Domain/Order.Domain.csproj", "src/Services/Order/Core/Order.Domain/"]
COPY ["src/Services/Order/Core/Order.Infrastructure/Order.Infrastructure.csproj", "src/Services/Order/Core/Order.Infrastructure/"]
RUN dotnet restore "./src/Services/Order/Api/Order.Api/Order.Api.csproj"
COPY . .
WORKDIR "/src/src/Services/Order/Api/Order.Api"
RUN dotnet build "./Order.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Order.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Order.Api.dll"]