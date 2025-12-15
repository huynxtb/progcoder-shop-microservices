# Contributing to PG Shop Microservices

We welcome contributions to the PG Shop Microservices project! This document provides guidelines for contributing.

## How to Report Bugs

If you find a bug, please create an issue on GitHub with:
- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment details (OS, .NET version, Docker version)

## How to Submit Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bugfix (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes with clear commit messages (see Commit Style below)
6. Push to your fork
7. Submit a pull request to the main repository

## Commit Style

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting (no logic change)
- **refactor**: Code restructuring
- **perf**: Performance improvements
- **test**: Test changes
- **build**: Build system changes
- **ci**: CI/CD changes
- **chore**: Miscellaneous changes

### Scope (Optional)

Service or component name: `catalog`, `basket`, `order`, `inventory`, `discount`, `notification`, `search`, `report`, `api-gateway`, `frontend`, etc.

### Examples

```bash
# Feature
feat(catalog): add MinIO image upload

# Bug fix
fix(order): correct discount calculation

# Documentation
docs(readme): update setup instructions

# Multiple services
refactor(catalog,inventory): extract common validation

# No scope
chore: update dependencies
```

### Rules

- Use imperative mood: "add" not "added"
- Keep subject under 50 characters
- No period at the end
- Reference issues: `Closes #123`, `Fixes #456`

## Code Style

- Follow standard .NET coding conventions
- Use meaningful variable and method names
- Add comments for complex logic
- Ensure your code builds without warnings
- Run code formatter before committing (if available)

## Questions?

If you have questions, feel free to open a GitHub issue or discussion.

Thank you for contributing!

