# Contributing to ProG Coder Shop Microservices

Thank you for your interest in contributing to ProG Coder Shop Microservices! This guide will help you get started with building, testing, and contributing to the project.

## Table of Contents

- [Contributing to ProG Coder Shop](#contributing-to-prog-coder-shop-microservices)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
    - [Required](#required)
    - [Optional](#optional)
  - [Getting Started](#getting-started)
  - [Building the Project](#building-the-project)
  - [Testing](#testing)
    - [Quick Local Testing](#quick-local-testing)
  - [Project Structure](#project-structure)
  - [Code Style](#code-style)
  - [Questions or Issues?](#questions-or-issues)

## Prerequisites

### Required

- **[.NET SDK 8.0+](https://dotnet.microsoft.com/download/dotnet/8.0)** (specified in `src/Directory.Build.props`)
- **[Docker Desktop](https://www.docker.com/products/docker-desktop)** (required for running services and infrastructure)

### Optional

- **[Node.js](https://nodejs.org/)** (v18+ recommended) - Required if you plan to work on the frontend applications in `src/Apps/`
- **[Just](https://github.com/casey/just)** - Command runner (if you prefer using automation scripts)

## Getting Started

0. (Optional) Comment on the related issue you want to work on
1. Fork the repository
2. Make a branch
3. Make your changes
4. Push the branch
5. Make a pull request

- There is a [**good first issue**](https://github.com/huynxtb/progcoder-shop-microservices/labels/good%20first%20issue) label for open issues

## Building the Project

```bash
# Builds the whole solution
dotnet build
```

## Testing

### Quick Local Testing

For most development work, you can simply run:

```bash
# Run all tests
dotnet test
```

### GitHub Actions Testing

The project uses GitHub Actions for continuous integration:

1. **CI Pipeline** (automatic)
   - Triggers automatically on pull requests
   - Runs validation for code quality, formatting, and tests.

## Project Structure

```
progcoder-shop-microservices/
├── src/
│   ├── ApiGateway/          # YARP API Gateway
│   ├── Apps/                # Frontend Applications (React/Next.js)
│   ├── JobOrchestrator/     # Background Jobs (Quartz.NET)
│   ├── Services/            # Microservices (Basket, Catalog, Order, etc.)
│   └── Shared/              # Shared libraries (Common, BuildingBlocks)
├── test/                    # Test projects
├── .github/                 # GitHub Actions workflows
├── docker-compose.yml       # Docker composition for services
└── samples/                 # Sample files
```

## Code Style

The project enforces consistent code style:

- **Formatting**: We follow standard .NET coding conventions.
- **Editor Configuration**: `.editorconfig` defines coding conventions enforced by the build.
- **Regions**: We use `#region` directives for organizing code (e.g., `#region using`, `#region Properties`).

## Questions or Issues?

Check out [GitHub Issues](https://github.com/huynxtb/progcoder-shop-microservices/issues) or [discussions](https://github.com/huynxtb/progcoder-shop-microservices/discussions).

Thank you for contributing to ProG Coder Shop Microservices!
