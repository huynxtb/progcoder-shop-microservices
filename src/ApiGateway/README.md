# ProG Coder

This project was created by ProG Coder. Visit [ProG Coder](https://www.progcoder.com) and search for the keyword `ProG Coder Shop Microservices` to see how to install it.

# ProG Coder Shop Microservices

This repository contains a suite of microservices implementing various **e-commerce** modules, including **Identity, Catalog, Basket, Discount, Order, Feedback, Search, Notification, User, Information**, and **Communicate**. These services utilize **NoSQL (DocumentDb, MongoDB, Redis)** and **Relational databases (PostgreSQL, SQL Server, MySQL)**, communicating via **RabbitMQ Event Driven Communication** and leveraging **YARP API Gateway**.

Overall picture of **implementations on microservices with .NET tools** on real-world **ProG Coder Shop Microservices** project.

![PGShopMicroservices](assets/imgs/PGShopMicroservices.png)

## Technology, Design Patterns & Architecture

### Technology
- ASP.NET Core Minimal APIs and the latest features of .NET 8 and C# 12
- Entity Framework based on MySQL and SQL Server
- OAUTH2 implementation using Identity Server
- Caching implementation using Redis
- High-performance inter-service communication with gRPC
- Monitoring and tracing log services
- Implementation of Proxy, Decorator, CQRS, and Cache-aside patterns
- Saga Choreography pattern for transaction handling

### Architecture
- Implementation of **DDD, CQRS, and Clean Architecture** following best practices

![CleanArchitecture](assets/imgs/CleanArchitecture.png)

## Included Services

### Identity Service
- Authentication and authorization using Duende Identity Server
- SQL Server for relational database management
- User login queue publishing with MassTransit and RabbitMQ
- Exposing gRPC services with Protobuf messages
- Cross-cutting concerns: Logging, Global Exception Handling, and Health Checks

### Catalog Service
- Marten library for .NET transactional document DB on PostgreSQL
- CQRS implementation using the MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Carter for minimal API endpoint definition
- Product lifecycle queue publishing with MassTransit and RabbitMQ
- Use Grpc server to allow services call to get product
- Cross-cutting concerns: Logging, Global Exception Handling, and Health Checks

### Basket Service
- CQRS implementation using MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Marten library for .NET transactional document DB on PostgreSQL
- Carter for minimal API endpoint definition
- Redis as a distributed cache over Basket DB on MongoDB
- Implementation of Proxy, Decorator, and Cache-aside patterns
- Inter-service sync communication with Discount gRPC Service for price calculation
- Basket Checkout queue publishing with MassTransit and RabbitMQ
- Cross-cutting concerns: Logging, Global Exception Handling, and Health Checks

### Discount Service
- CQRS implementation using MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Marten library for .NET transactional document DB on PostgreSQL
- Carter for minimal API endpoint definition
- High-performance inter-service gRPC communication with Basket Service
- Exposing gRPC services with Protobuf messages
- Cross-cutting concerns: Logging, Global Exception Handling, and Health Checks

### Order Service
- CQRS implementation using MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Marten library for .NET transactional document DB on PostgreSQL
- Carter for minimal API endpoint definition
- Consuming RabbitMQ Basket Checkout event queue with MassTransit and RabbitMQ
- MySQL database connection and containerization
- Entity Framework Core ORM with auto-migration to MySQL on application startup

### Feedback Service
- CQRS implementation using MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Marten library for .NET transactional document DB on PostgreSQL
- Carter for minimal API endpoint definition
- MySQL database connection and containerization
- Entity Framework Core ORM with auto-migration to MySQL on application startup

### Search Service
- CQRS implementation using MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Marten library for .NET transactional document DB on PostgreSQL
- Carter for minimal API endpoint definition
- Consuming RabbitMQ Product lifecycle on Catalog service event queue with MassTransit and RabbitMQ
- MySQL database connection and containerization
- Entity Framework Core ORM with auto-migration to MySQL on application startup

### Notification Service
- CQRS implementation using MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Marten library for .NET transactional document DB on PostgreSQL
- Carter for minimal API endpoint definition
- Consuming RabbitMQ all service event queue with MassTransit and RabbitMQ
- Use MongoDB

### User Service
- CQRS implementation using MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Marten library for .NET transactional document DB on PostgreSQL
- Carter for minimal API endpoint definition
- Consuming RabbitMQ User login from Identity service event queue with MassTransit and RabbitMQ
- Use MongoDB

### Information Service
- CQRS implementation using MediatR library
- Validation pipeline behaviors with MediatR and FluentValidation
- Marten library for .NET transactional document DB on PostgreSQL
- Carter for minimal API endpoint definition
- Use MongoDB

### Communicate Service
- ASP.NET Realtime Server application
- Using SignalR for real-time communication

### YARP API Gateway
- Development of API Gateways with YARP Reverse Proxy applying Gateway Routing Pattern
- YARP Reverse Proxy Configuration: Route, Cluster, Path, Transform, Destinations
- Rate Limiting with FixedWindowLimiter on YARP Reverse Proxy Configuration

### Microservices Communication
- Synchronous inter-service communication with gRPC
- Asynchronous microservices communication with RabbitMQ Message-Broker Service
- RabbitMQ Publish/Subscribe Topic Exchange Model
- MassTransit for abstraction over RabbitMQ Message-Broker system

### WebUI ProG Coder Shop Microservices
- React JS, TailwindCSS, Vite
- API calls to YARP with Axios

## WebUI Screenshots

### Admin
![Admin](assets/imgs/UIAdmin.JPG)

### User
![User](assets/imgs/UIUser.JPG)

## Data Infrastructure

### MinIO
- Object storage solution designed for high performance and scalability
- Ideal for storing images, files, and other unstructured data

### Zipkin
- Distributed tracing system for monitoring and troubleshooting microservices
- Helps in identifying latency issues and tracking the flow of requests across services

### Seq
- Centralized log management system for aggregating and visualizing service logs
- Provides powerful querying capabilities and real-time insights into application behavior

### Airflow
- Workflow automation and scheduling system, with jobs written in Python
- Navigate to the `airflow` directory to see all DAGs (Directed Acyclic Graphs) and workflows
- Facilitates complex data engineering and ETL processes

## Running the Project
For detailed instructions on running and installing the project, visit [ProG Coder](https://www.progcoder.com) and search for the keyword `ProG Coder Shop Microservices` to see how to install it.

## Detailed Service Flow
For an in-depth look at each service, please navigate to the `src/Services` directory and read `Readme.md`.

## Give a Star! :star:
If you liked the project or if it helped you, please **give a star**.

## Bugs, Feature Requests and Contributing
I'd love to see community contributions. I like to keep it simple and use Github issues to track bugs and feature requests and pull requests to manage contributions. See the [contribution information](.github/CONTRIBUTING.md) for more information.

## Donate
Donate at [Buy Me a Coffee](https://buymeacoffee.com/progcoder).

## Authors

- **Huy Nguyen** - *Initial work* - [huynxtb](https://github.com/huynxtb)

See also the list of [contributors](https://github.com/huynxtb/pg-shop-microservices/contributors) who participated in this project.

## Authors
Code released under [the MIT License](https://github.com/huynxtb/pg-shop-microservices/blob/main/LICENSE)