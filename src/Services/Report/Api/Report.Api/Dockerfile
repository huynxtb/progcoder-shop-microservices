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
COPY ["src/Services/Report/Api/Report.Api/Report.Api.csproj", "src/Services/Report/Api/Report.Api/"]
COPY ["src/Shared/Common/Common.csproj", "src/Shared/Common/"]
COPY ["src/Services/Report/Core/Report.Application/Report.Application.csproj", "src/Services/Report/Core/Report.Application/"]
COPY ["src/Shared/BuildingBlocks/BuildingBlocks.csproj", "src/Shared/BuildingBlocks/"]
COPY ["src/Shared/EventSourcing/EventSourcing.csproj", "src/Shared/EventSourcing/"]
COPY ["src/Services/Report/Core/Report.Domain/Report.Domain.csproj", "src/Services/Report/Core/Report.Domain/"]
COPY ["src/Services/Report/Core/Report.Infrastructure/Report.Infrastructure.csproj", "src/Services/Report/Core/Report.Infrastructure/"]
RUN dotnet restore "./src/Services/Report/Api/Report.Api/Report.Api.csproj"
COPY . .
WORKDIR "/src/src/Services/Report/Api/Report.Api"
RUN dotnet build "./Report.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Report.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Report.Api.dll"]