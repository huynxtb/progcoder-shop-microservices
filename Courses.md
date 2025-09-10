Courses

[Full Course] .NET Microservices: Xây Dựng Web bán hàng (Shopping Cart) từ cơ bản tới nâng cao (Beginer to Pro)

Building shopping cart microservices on .NET used ASP.NET API, RabbitMQ, Elastich search, gRPC, docker, redis

Part 1: Introduction
- Overview
- Pre-requisite
- Evn setup
- Tech used
- Vertical/Clean Architecture
- DDD, CQRS
- Desgin pattern
- How many services

Part: Demo
- Web user/admin
- Authen with keycloak
- Monitoring
- CI/CD (Optional) 

============= CORE =================
Part 2: BuildingBlocks - CQRS and Mediator pattern
- Create abstractions ICommand, IQuery

Part 3:
- FluentValidation
- Custom error, pipeline
- Build common

Par 3.1: Setup swagger

Part 2: Create base code
- Analyz, Database
- Focus on the create based project
- Implement Clean Architecture
- Explain

Part: Deploy all db using docker (only do it when needed)

============= CATALOG =================
Part 2: Create first microervies with Catalog service and Implement Clean Architecture .NET
- Analyz flow, feature
- Database
- Marten DB

Part 4: Catalog service - Implement minial apis
- Create product
- Implement DDD
- Implement Github Api with refit upload image
- Add Poly
- Delete
- Update

Part 4: Catalog service - Add health check
- Explain

============= INVENTORY =================
Part: Create Inventory Service
- DB design
- Analyz flow

Part: create entity
- add migrations

Part 5: Create script auto migrate
- bat file
- Explain

Part 5: Implement InterceptorSavechange
- Focus on Interceptor
- Explain

Part 6: Implement Api feature
- CRUD

Part 6: Implement Refit to call catalog api
- Explain

Part 6: Implement poly
- Explain

PArt 6: Grpc
- Explain

Part 6 (**): Implement grpc server in catalog service

Part 6 (**): Implement grpc client in inventory replace refit

Part: create event sourcing
- Explain
- Why need event sourcing

Part: create message queue, rabbitmq, masstransit
- Explain
- Flow

Part: Implement event sourcing with rabbitmq for catalog service (consumer)
- Explain
- Flow

Part: cImplement event sourcing with rabbitmq for inventory service (consumer)
- Explain
- Flow


Part: outbox pattern
- Explain

Part (**): Create worker in Inventory service + outbox pattern
- Explain
- Implement
- Using postgres + dapper


Part 6: Create notification services using Strategry Pattern
- Email
- WhatApps
- Telegram

Part 6: Implement catalog service
- Table design
- Function create, update, delete, get
- Implement github api to use image url

Part 7: Implement refit replace httpclient
- Explain
- Impl for github api

Part 6: Impl api gateway
- Explain
- Impl

Part 7 (*): Implement minio replace github api
- Explain minio
- Implement

Part 7.1: Implement authen vs Keycloak
- Explain
- Implement

Part 7.2(*): add authorize with role base vs Keycloak
- Implement

Part 7.3: impl keycloak api
- Implement

Part 8: Implement inventory service
- Table design
- Function crud

Part 8: using rabbitmq to comunicate with catalog service
- Using rabbit mq

Part 9: Impl discount service
- Table desgin
- Crud

Part 10: impl order service, refit implement
- table design
- Checkout
- Comunkcate with product, discount, product inventory using Refit

Part 11: Using httpclient to communicate with discount, product inventory
- Explain, impl

Part 11: Impl poly 
- Explain, impl

Part 12: Impl redis to cache discount 
- Explain, impl
- Decorator

Part 11 (*): Using grpc to communicate with discount, product inventory
- Explain, impl

Part 12: Impl payment service
- Table desgin
- Explain
- Using sepay
- Rabbit mq

Part 13 (*): Create search service using elk

Part 14 (*): Handle user change from Keycloak vs User service using spi

Part 15 (*): Setup monitoring
- Promethues
- Grafana
- Open Teramy
- Service monitoring
- Database
- Etc.

Part 16 (*): Create Background service
- Using Quarzt
- Using N8N create report for Order