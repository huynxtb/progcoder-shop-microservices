# ProG Coder Shop Microservices

This project was created by ProG Coder. Visit [ProG Coder](https://www.progcoder.com) for more information.

# ProG Coder Shop Microservices - E-Commerce Platform

This repository contains a comprehensive suite of microservices implementing a complete **e-commerce platform**, including **Catalog, Basket, Order, Inventory, Discount, Notification, Search, Report, and Communication** services. The platform utilizes **NoSQL (MongoDB, Redis)** and **Relational databases (PostgreSQL, SQL Server, MySQL)**, with services communicating via **RabbitMQ Event-Driven Architecture** and routing through **YARP API Gateway**.

Overall picture of **microservices implementation with .NET tools** in a real-world **ProG Coder Shop Microservices** project.

![ProGCoder.Com](assets/imgs/ProGCoder.Com.Diagram.png)

## Technology Stack, Design Patterns, Infrastructure & Architecture

### Infrastructure

- **`Windows 11`** - The OS for developing and building this application.
- **[`WSL2 - Ubuntu OS`](https://docs.microsoft.com/en-us/windows/wsl/install-win10)** - The subsystem that helps to run the bash shell on Windows OS.
- **[`Docker for Desktop (Kubernetes enabled)`](https://www.docker.com/products/docker-desktop)** - The easiest tool to run Docker, Docker Swarm, and Kubernetes on Mac and Windows.
- **[`Kubernetes`](https://kubernetes.io) / [`AKS`](https://docs.microsoft.com/en-us/azure/aks)** - The app is designed to run on Kubernetes (both locally on "Docker for Desktop" as well as on the cloud with AKS).
- **[`Jenkins`](https://www.jenkins.io)** - ⚠️ **Under Development** - CI/CD automation server for building, testing, and deploying applications.
- **[`Helm`](https://helm.sh)** - ⚠️ **Under Development** - Package manager for Kubernetes applications.

### Back-end

- **[`.NET Core 8`](https://dotnet.microsoft.com/download)** - .NET Framework and .NET Core, including ASP.NET and ASP.NET Core.
- **[`Keycloak`](https://www.keycloak.org)** - Open-source Identity and Access Management solution.
- **[`YARP`](https://github.com/microsoft/reverse-proxy)** - A toolkit for developing high-performance HTTP reverse proxy applications.
- **[`FluentValidation`](https://github.com/FluentValidation/FluentValidation)** - Popular .NET validation library for building strongly-typed validation rules.
- **[`MediatR`](https://github.com/jbogard/MediatR)** - Simple, unambitious mediator implementation in .NET.
- **[`EF Core`](https://github.com/dotnet/efcore)** - Modern object-database mapper for .NET. It supports LINQ queries, change tracking, updates, and schema migrations.
- **[`Scrutor`](https://github.com/khellang/Scrutor)** - Assembly scanning and decoration extensions for Microsoft.Extensions.DependencyInjection.
- **[`Serilog`](https://github.com/serilog/serilog)** - Simple .NET logging with fully-structured events.
- **[`Carter`](https://github.com/CarterCommunity/Carter)** - Carter is a library that allows Nancy-esque routing for use with ASP.NET Core.
- **[`Marten`](https://github.com/JasperFx/marten)** - Marten is a .NET document database and event store library.
- **[`AspNetCore.HealthChecks`](https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks)** - Health checks for building services, such as ASP.NET Core.
- **[`Grpc.AspNetCore`](https://github.com/grpc/grpc-dotnet)** - gRPC for .NET, a high-performance RPC framework.
- **[`MassTransit.RabbitMQ`](https://github.com/MassTransit/MassTransit)** - Distributed application framework for .NET, supporting RabbitMQ.
- **[`AutoMapper`](https://github.com/LuckyPennySoftware/AutoMapper)** - A high-performance object mapper in .NET.
- **[`MongoDB.Driver`](https://github.com/mongodb/mongo-csharp-driver)** - Official MongoDB .NET Driver.
- **[`Minio`](https://github.com/minio/minio-dotnet)** - MinIO .NET Client SDK for Amazon S3 compatible cloud storage.
- **[`StackExchangeRedis`](https://github.com/StackExchange/StackExchange.Redis)** - General purpose Redis client for .NET.
- **[`Polly`](https://github.com/App-vNext/Polly)** - Polly is a .NET resilience and transient-fault-handling library.
- **[`OpenTelemetry`](https://opentelemetry.io)** - OpenTelemetry provides observability frameworks for cloud-native software.
- **[`Quartz.NET`](https://www.quartz-scheduler.net)** - Job scheduling library for .NET.
- **[`NEST`](https://github.com/elastic/elasticsearch-net)** - Official Elasticsearch .NET client for full-text search and analytics.

### Front-end

- **[`Node.js 18.x`](https://nodejs.org/en/download)** - JavaScript runtime built on Chrome's V8 JavaScript engine.
- **[`ReactJS`](https://reactjs.org)** - A JavaScript library for building user interfaces.
- **[`Vite`](https://vitejs.dev)** - Next generation frontend tooling for fast development.
- **[`i18next`](https://www.i18next.com)** - Internationalization framework.
- **[`Keycloak-js`](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter)** - JavaScript adapter for Keycloak.

### Design Patterns

- **Decorator** - A structural pattern that allows behavior to be added to individual objects dynamically.
- **Strategy** - A behavioral pattern that enables selecting an algorithm's behavior at runtime.
- **CQRS** - Command Query Responsibility Segregation, a pattern that separates read and write operations.
- **Saga** - A pattern for managing failures, ensuring data consistency across microservices.
- **Outbox Pattern** - Ensures reliable event publishing in distributed systems.

### Architecture

- Implementation of **DDD, CQRS, and Clean Architecture** following best practices.

![ProGCoder.Com](assets/imgs/ProGCoder.ComCleanArchitecture.png)

## Microservices Overview

| Service | Port (HTTPS) | gRPC Port | Database | Description |
|---------|-------------|-----------|----------|-------------|
| **Catalog Service** | 5001 | 6001 | PostgreSQL (5433) | Product catalog management, categories, brands |
| **Basket Service** | 5006 | - | MongoDB (27018) + Redis (6380) | Shopping cart and session management |
| **Order Service** | 5005 | 6005 | SQL Server (1434) | Order processing and management |
| **Inventory Service** | 5002 | - | MySQL (3307) | Stock and inventory management |
| **Discount Service** | 5004 | 6004 | PostgreSQL (5433) | Coupons, promotions, and discount rules |
| **Notification Service** | 5003 | - | PostgreSQL (5433) | Email/SMS notifications |
| **Report Service** | 5007 | 6007 | PostgreSQL (5433) | Analytics, dashboards, and reporting |
| **Search Service** | 5008 | - | Elasticsearch (9200) | Full-text product search |
| **Communication Service** | 5009 | - | PostgreSQL (5433) | Webhooks and external integrations |

## Infrastructure Services

| Component | Port(s) | Purpose | Access URL | Default Credentials |
|-----------|---------|---------|------------|-------------------|
| **PostgreSQL** | 5433 | Relational database for multiple services | `localhost:5433` | postgres / 123456789Aa |
| **MongoDB** | 27018 | Document database for Basket service | `localhost:27018` | mongodb / 123456789Aa |
| **MySQL** | 3307 | Relational database for Inventory | `localhost:3307` | root / 123456789Aa |
| **SQL Server** | 1434 | Relational database for Order service | `localhost:1434` | sa / 123456789Aa |
| **Redis** | 6380 | Cache and session storage | `localhost:6380` | Password: 123456789Aa |
| **RabbitMQ** | 5673, 15673 | Message broker for event-driven communication | http://localhost:15673 | admin / 123456789Aa |
| **Keycloak** | 8080 | Identity and Access Management | http://localhost:8080 | admin / admin |
| **MinIO** | 9000, 9001 | S3-compatible object storage | http://localhost:9001 | minioadmin / minioadmin |
| **Elasticsearch** | 9200 | Search engine and analytics | http://localhost:9200 | elastic / elastic123 |
| **Prometheus** | 9090 | Metrics collection and monitoring | http://localhost:9090 | - |
| **Grafana** | 3000 | Metrics visualization and dashboards | http://localhost:3000 | admin / admin |
| **Tempo** | 3200 | Distributed tracing backend | http://localhost:3200 | - |
| **Loki** | 3100 | Log aggregation system | http://localhost:3100 | - |
| **Promtail** | 1514, 9080 | Log collection agent | - | - |
| **OpenTelemetry Collector** | 4317, 8888 | Telemetry data collection | http://localhost:8888 | - |
| **Portainer** | 9000, 9443 | Container management UI | http://localhost:9443 | admin / (set on first run) |
| **MailHog** | 1025, 8025 | Email testing tool | http://localhost:8025 | - |
| **cAdvisor** | - | Container metrics | - | - |

## Web Applications

| Application | Port | Technology Stack | Purpose | Access URL |
|-------------|------|------------------|---------|------------|
| **App.Admin** | 3001 | React + Vite + TailwindCSS | Admin management interface | http://localhost:3001 |
| **Store Frontend** | 3002 | React + Vite + Bootstrap | Customer shopping interface | http://localhost:3002 |
| **YARP API Gateway** | 5000 | ASP.NET Core + YARP | API Gateway and reverse proxy | http://localhost:5000 |

## Web UI Screenshots

### App.Admin
![Admin](assets/imgs/screenshots/admin/home.JPG)

### App.Store
![User](assets/imgs/screenshots/user/home.JPG)

All screenshots are stored in [assets/imgs/screenshots](assets/imgs/screenshots).

## Project Structure

```
progcoder-shop-microservices/
├── src/
│   ├── Services/                    # Backend Microservices
│   │   ├── Basket/                  # Shopping cart service
│   │   │   ├── Api/                 # REST API endpoints
│   │   │   ├── Core/                # Domain, Application layers
│   │   │   └── Worker/              # Background workers (Outbox)
│   │   ├── Catalog/                 # Product catalog service
│   │   │   ├── Api/                 # REST API + gRPC
│   │   │   ├── Core/                # Domain, Application layers
│   │   │   └── Worker/              # Background workers (Outbox, Consumer)
│   │   ├── Communication/           # Webhooks and messaging
│   │   ├── Discount/                # Coupons and promotions
│   │   ├── Inventory/               # Stock management
│   │   ├── Notification/            # Email/SMS notifications
│   │   ├── Order/                   # Order processing
│   │   ├── Report/                  # Analytics and reporting
│   │   └── Search/                  # Product search (Elasticsearch)
│   ├── Apps/
│   │   ├── App.Admin/               # App.Admin (React)
│   │   └── App.Store/               # E-commerce storefront (React)
│   ├── ApiGateway/
│   │   └── YarpApiGateway/          # YARP reverse proxy
│   ├── JobOrchestrator/
│   │   └── App.Job/                 # Scheduled background jobs (Quartz)
│   └── Shared/
│       ├── BuildingBlocks/          # CQRS, Behaviors, Pagination
│       ├── Common/                  # Extensions, Helpers, Models
│       ├── Contracts/               # gRPC proto definitions
│       └── EventSourcing/           # Integration events
├── config/                          # Configuration files
│   ├── prometheus/                  # Prometheus config and alert rules
│   ├── grafana/                     # Grafana dashboards and datasources
│   ├── loki/                        # Loki configuration
│   ├── tempo/                       # Tempo configuration
│   ├── otel-collector/              # OpenTelemetry Collector config
│   ├── keycloak/                    # Keycloak providers
│   └── rabbitmq/                    # RabbitMQ plugins
├── assets/                          # Static assets
│   ├── imgs/                        # Architecture diagrams and screenshots
│   └── postman collections/         # API testing collections
├── local-data/                      # Persistent data volumes
├── docker-compose.dev.yml           # Infrastructure services
├── docker-compose.yml               # Application services
└── README.md                        # This file
```

## Architecture & Design Patterns

### Clean Architecture

The project follows Clean Architecture principles with clear separation of concerns:

- **Domain Layer**: Contains business entities, value objects, domain events, and business rules. No dependencies on other layers.
- **Application Layer**: Contains business logic, CQRS commands/queries, DTOs, and interfaces. Depends only on Domain layer.
- **Infrastructure Layer**: Contains data access, external service integrations, and infrastructure concerns. Implements interfaces from Application layer.
- **API Layer**: Contains REST API endpoints using Carter, request/response models, and API routing.

### Domain-Driven Design (DDD)

- **Aggregates**: Root entities that maintain consistency boundaries
- **Value Objects**: Immutable objects representing domain concepts
- **Domain Events**: Events raised within the domain to communicate state changes
- **Repositories**: Abstraction for data access with interface in Application and implementation in Infrastructure

### CQRS (Command Query Responsibility Segregation)

- **Commands**: Write operations that modify state (using MediatR)
- **Queries**: Read operations that return data without side effects
- **Handlers**: Separate handlers for commands and queries
- **Validators**: FluentValidation for command/query validation

### Event-Driven Architecture

- **Domain Events**: Internal events within a service
- **Integration Events**: Cross-service communication via RabbitMQ
- **Outbox Pattern**: Ensures reliable event publishing using outbox tables
- **Event Handlers**: MassTransit consumers for processing integration events

### Saga Pattern

Distributed transaction management across multiple services using choreography-based sagas with event-driven coordination.

## CI/CD Pipeline

> ⚠️ **Status: Under Development**
>
> CI/CD pipeline with Jenkins and Kubernetes deployment is currently under development. Detailed documentation will be updated soon.

![ProGCoder.Com CI/CD](assets/imgs/ProGCoder.Com.CICD.png)

## Observability & Monitoring

### Distributed Tracing

- **OpenTelemetry**: Instrumentation for all services
- **Tempo**: Distributed tracing backend
- **Jaeger Protocol**: Trace visualization and analysis

### Metrics & Monitoring

- **Prometheus**: Metrics collection from all services
- **Grafana**: Pre-configured dashboards for:
  - Service health and performance
  - Database metrics
  - Message queue statistics
  - HTTP request rates and latency
  - Business metrics (orders, revenue, etc.)
- **cAdvisor**: Container resource usage metrics
- **ASP.NET Core Health Checks**: Service health endpoints

### Centralized Logging

- **Loki**: Log aggregation system
- **Promtail**: Log collection agent
- **Grafana**: Log visualization and querying
- **Serilog**: Structured logging in all services

### Alerting

- **Prometheus Alertmanager**: Alert routing and management
- Configured alerts for:
  - Service downtime
  - High error rates
  - Database connection failures
  - Message queue backlogs

## Data Infrastructure

### MinIO
- Object storage solution designed for high performance and scalability
- Stores product images, documents, and other unstructured data
- S3-compatible API for easy integration

### Elasticsearch
- Full-text search engine for product catalog
- Powered by Search Service for fast product discovery
- Supports fuzzy search, filters, and faceted navigation

### Redis
- In-memory cache for session management
- Shopping cart persistence
- Distributed caching for frequently accessed data

### Message Broker (RabbitMQ)
- Event-driven communication between services
- Reliable message delivery with acknowledgments
- Dead-letter queues for failed messages
- Message persistence for durability

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- **Docker Desktop** (with Kubernetes enabled) - [Download](https://www.docker.com/products/docker-desktop)
- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)

### Environment Configuration

1. **Create environment file** (Infrastructure uses environment variables):

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and configure your custom ports and credentials if needed
```

**Note**: The `.env.example` file contains all required environment variables with default values. Key configurations include:
- Database ports (custom ports to avoid conflicts: PostgreSQL 5433, MongoDB 27018, MySQL 3307, SQL Server 1434)
- Database credentials
- Message broker settings (RabbitMQ on ports 5673/15673)
- Identity provider (Keycloak on port 8080)
- Monitoring stack ports
- Object storage (MinIO on ports 9000/9001)

### Quick Start (Production/Testing Mode)

**Run the entire system with Docker Compose** - Best for testing and production deployment:

```bash
# Clone the repository
git clone <repository-url>
cd progcoder-shop-microservices

# Copy and configure environment variables
cp .env.example .env

# Start ALL services (infrastructure + microservices + frontend)
docker-compose up -d

# Check all services are running
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

After starting, access:
- **App.Admin**: http://localhost:3001
- **App.Store**: http://localhost:3002
- **API Gateway**: http://localhost:5000
- **Keycloak**: http://localhost:8080
- **Grafana**: http://localhost:3000
- **RabbitMQ Management**: http://localhost:15673

### Development Mode

**For development**, run services individually to debug and modify code:

#### 1. Start Infrastructure Services Only

```bash
# Start infrastructure services (databases, message broker, monitoring, etc.)
docker-compose -f docker-compose.dev.yml up -d

# Wait for all services to be healthy (check with)
docker-compose -f docker-compose.dev.yml ps

# View logs if needed
docker-compose -f docker-compose.dev.yml logs -f [service-name]
```

#### 2. Setup Databases

**Option A: Apply Existing Migrations (Recommended for first-time setup)**

Use this to apply all existing migrations to your databases without creating new ones:

```bash
# On Linux/Mac/WSL
chmod +x run-migration.sh
./run-migration.sh

# On Windows (PowerShell/CMD)
run-migration.bat
```

This script will automatically:
- Install dotnet-ef tool if needed
- Apply all pending migrations for Inventory service (MySQL)
- Apply all pending migrations for Order service (SQL Server)
- Show a summary of results

**Option B: Create New Migrations (For developers making schema changes)**

Use this when you need to create a new migration after modifying entities:

```bash
# On Linux/Mac/WSL
chmod +x add-migration.sh
./add-migration.sh

# On Windows (PowerShell/CMD)
add-migration.bat
```

This script will:
- Prompt you to select a service
- Ask for a migration name
- Create the migration
- Automatically apply it to the database

#### 3. Configure Keycloak

1. Open Keycloak Admin Console: http://localhost:8080
2. Login with: `admin` / `admin`
3. Create realm: `prog-coder-realm`
4. Create client: `prog-coder-client-id`
5. Configure client settings and obtain client secret
6. Update `appsettings.json` in each service with Keycloak settings

#### 4. Start Backend Services

Each service can be started individually. Open separate terminal windows:

```bash
# Catalog Service
cd src/Services/Catalog/Api/Catalog.Api
dotnet run

# Basket Service
cd src/Services/Basket/Api/Basket.Api
dotnet run

# Order Service
cd src/Services/Order/Api/Order.Api
dotnet run

# Inventory Service
cd src/Services/Inventory/Api/Inventory.Api
dotnet run

# Discount Service
cd src/Services/Discount/Api/Discount.Api
dotnet run

# Notification Service
cd src/Services/Notification/Api/Notification.Api
dotnet run

# Report Service
cd src/Services/Report/Api/Report.Api
dotnet run

# Search Service
cd src/Services/Search/Api/Search.Api
dotnet run

# Communication Service
cd src/Services/Communication/Api/Communication.Api
dotnet run

# API Gateway
cd src/ApiGateway/YarpApiGateway
dotnet run
```

#### 5. Start Worker Services (Background Jobs)

```bash
# Catalog Outbox Worker
cd src/Services/Catalog/Worker/Catalog.Worker.Outbox
dotnet run

# Basket Outbox Worker
cd src/Services/Basket/Worker/Basket.Worker.Outbox
dotnet run

# Order Outbox Worker
cd src/Services/Order/Worker/Order.Worker.Outbox
dotnet run

# Inventory Outbox Worker
cd src/Services/Inventory/Worker/Inventory.Worker.Outbox
dotnet run

# Notification Consumer Worker
cd src/Services/Notification/Worker/Notification.Worker.Consumer
dotnet run

# Search Consumer Worker
cd src/Services/Search/Worker/Search.Worker.Consumer
dotnet run
```

#### 6. Start Frontend Applications

```bash
# App Admin
cd src/Apps/App.Admin
npm install
npm run dev
# Access at: http://localhost:3001

# App Store
cd src/Apps/App.Store
npm install
npm run dev
# Access at: http://localhost:3002
```

#### 7. Start Job Orchestrator (Optional)

```bash
cd src/JobOrchestrator/App.Job
dotnet run
```

### Access URLs

After starting all services, you can access:

#### Frontend Applications
- **App.Admin**: http://localhost:3001
- **App.Store**: http://localhost:3002
- **API Gateway**: http://localhost:5000

#### Backend Services (Swagger)
- **Catalog API**: http://localhost:5001/swagger
- **Basket API**: http://localhost:5006/swagger
- **Order API**: http://localhost:5005/swagger
- **Inventory API**: http://localhost:5002/swagger
- **Discount API**: http://localhost:5004/swagger
- **Notification API**: http://localhost:5003/swagger
- **Report API**: http://localhost:5007/swagger
- **Search API**: http://localhost:5008/swagger
- **Communication API**: http://localhost:5009/swagger

#### Infrastructure & Monitoring
- **Keycloak**: http://localhost:8080 (admin / admin)
- **RabbitMQ Management**: http://localhost:15673 (admin / 123456789Aa)
- **MinIO Console**: http://localhost:9001 (minioadmin / minioadmin)
- **Grafana**: http://localhost:3000 (admin / admin)
- **Prometheus**: http://localhost:9090
- **Portainer**: http://localhost:9443
- **MailHog**: http://localhost:8025
- **Elasticsearch**: http://localhost:9200 (elastic / elastic123)

### Default Credentials

| Service | Username | Password |
|---------|----------|----------|
| Keycloak | admin | admin |
| Grafana | admin | admin |
| RabbitMQ | admin | 123456789Aa |
| PostgreSQL | postgres | 123456789Aa |
| MongoDB | mongodb | 123456789Aa |
| MySQL | root | 123456789Aa |
| SQL Server | sa | 123456789Aa |
| MinIO | minioadmin | minioadmin |
| Elasticsearch | elastic | elastic123 |
| Redis | - | 123456789Aa |

## API Gateway Routes

The YARP API Gateway provides unified access to all microservices:

| Route | Target Service | Example |
|-------|---------------|---------|
| `/catalog-service/**` | Catalog Service (5001) | `/catalog-service/api/products` |
| `/basket-service/**` | Basket Service (5006) | `/basket-service/api/baskets` |
| `/order-service/**` | Order Service (5005) | `/order-service/api/orders` |
| `/inventory-service/**` | Inventory Service (5002) | `/inventory-service/api/inventory` |
| `/discount-service/**` | Discount Service (5004) | `/discount-service/api/coupons` |
| `/notification-service/**` | Notification Service (5003) | `/notification-service/api/notifications` |
| `/report-service/**` | Report Service (5007) | `/report-service/api/reports` |
| `/search-service/**` | Search Service (5008) | `/search-service/api/search` |
| `/communication-service/**` | Communication Service (5009) | `/communication-service/api/webhooks` |

## Development

### Running Individual Services

You can run services individually for development:

```bash
cd src/Services/[ServiceName]/Api/[ServiceName].Api
dotnet watch run
```

### Running Tests

```bash
# Run all tests
dotnet test

# Run tests for a specific service
cd src/Services/[ServiceName]/Tests
dotnet test
```

### Database Migrations

```bash
# Add migration
cd src/Services/[ServiceName]/Infrastructure
dotnet ef migrations add [MigrationName] -s ../Api/[ServiceName].Api

# Apply migration
dotnet ef database update -s ../Api/[ServiceName].Api
```

### Building Docker Images

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build [service-name]
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure no other services are using the configured ports
   - Check with: `netstat -ano | findstr :[PORT]` (Windows) or `lsof -i :[PORT]` (Mac/Linux)

2. **Database Connection Errors**: 
   - Verify all database containers are running: `docker ps`
   - Check database logs: `docker logs [container-name]`

3. **Keycloak Configuration**:
   - Ensure realm and client are properly configured
   - Verify client secret matches in service configurations

4. **RabbitMQ Connection Issues**:
   - Check RabbitMQ is running: http://localhost:15673
   - Verify credentials in service configurations

### Useful Commands

```bash
# Check container status
docker-compose -f docker-compose.dev.yml ps

# View logs
docker-compose -f docker-compose.dev.yml logs -f [service-name]

# Restart a service
docker-compose -f docker-compose.dev.yml restart [service-name]

# Stop all services
docker-compose -f docker-compose.dev.yml down

# Remove volumes (clean slate)
docker-compose -f docker-compose.dev.yml down -v
```

## Contributing

We welcome community contributions! We use GitHub issues to track bugs and feature requests, and pull requests to manage contributions. See the [contribution information](.github/CONTRIBUTING.md) for more details.

## License

Code released under [the MIT License](LICENSE)

## Authors

- **Huy Nguyen** - *Initial work* - [huynxtb](https://github.com/huynxtb)

See also the list of [contributors](https://github.com/huynxtb/progcoder-shop-microservices/contributors) who participated in this project.

## Video Tutorials

📺 **Complete video tutorials and detailed explanations** are available on YouTube!

👉 **YouTube Channel**: [ProG Coder](https://www.youtube.com/@prog-coder)

### Course Series: .NET Microservices - Shopping Cart (Beginner to Pro)

This is a comprehensive course series covering everything from basics to advanced topics. See the complete course outline in [`YOUTUBE_SERIES.md`](YOUTUBE_SERIES.md).

**What you'll learn**:
- Building microservices with .NET 8 and Clean Architecture
- Implementing DDD, CQRS, and design patterns
- Event-driven architecture with RabbitMQ
- Authentication with Keycloak
- Observability with Prometheus, Grafana, and OpenTelemetry
- Docker and Kubernetes deployment
- And much more!

🎬 **Subscribe** to the channel to get notified of new videos: [https://www.youtube.com/@prog-coder](https://www.youtube.com/@prog-coder)

## Support

If you liked the project or if it helped you, please **give a star** ⭐

## Donate

Your support helps create more high-quality content and maintain this project!

For donation methods and details, please see [DONATE.md](DONATE.md).

## Community

Join our community to stay updated and connect with other developers:

- 💬 **Facebook Group**: [ProG Coder Community](https://www.facebook.com/groups/1331222145420361) - Get the latest updates, ask questions, and share your experience
- 📺 **YouTube Channel**: [ProG Coder](https://www.youtube.com/@prog-coder) - Video tutorials and coding sessions
- 🌐 **Website**: [https://www.progcoder.com](https://www.progcoder.com) - Articles, resources, and more

## Additional Resources

- **Postman Collection**: See `assets/postman collections/` for API testing
- **Architecture Diagrams**: See `assets/imgs/` for visual references

