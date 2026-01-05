# Backend Rules - Microservices, Clean Architecture, DDD, CQRS

## Solution Structure
```
src/Services/{Service}/
  ├── Api/              # Carter endpoints, ApiRoutes
  ├── Core/Domain/      # Entities, Aggregates, ValueObjects, Events
  ├── Core/Application/ # CQRS (Commands/Queries), DTOs, Repositories, Validators
  └── Core/Infrastructure/ # Repository/Service implementations, DB, gRPC
```

## Layer Responsibilities
- **Domain**: Entities (inherit `Entity<T>` or `Aggregate<T>`), DomainEvents, pure logic, NO dependencies
- **Application**: CQRS, DTOs, interfaces, FluentValidation, Mappings
- **Infrastructure**: DB (Marten/EF Core), External services, Refit/gRPC clients
- **API**: Carter modules, Request/Response models, DI registration

---

## CQRS Patterns

### Commands & Handlers
```csharp
// Command
public sealed record CreateProductCommand(CreateProductDto Dto, Actor Actor) : ICommand<Guid>;

// Handler (Primary Constructor)
public sealed class CreateProductCommandHandler(IDocumentSession session) 
    : ICommandHandler<CreateProductCommand, Guid>
{
    public async Task<Guid> Handle(CreateProductCommand cmd, CancellationToken ct)
    {
        var entity = ProductEntity.Create(Guid.NewGuid(), cmd.Dto.Name!, cmd.Actor.ToString());
        session.Store(entity);
        await session.SaveChangesAsync(ct);
        return entity.Id;
    }
}

// Validator
public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Dto.Name).NotEmpty().WithMessage(MessageCode.ProductNameIsRequired);
    }
}
```

### Queries & Results
**🚨 CRITICAL: NEVER return DTOs or nullable types directly. Use Result wrapper.**

```csharp
// ❌ WRONG
public record GetQuery(Guid Id) : IQuery<ProductDto>;  // Direct DTO
public record GetQuery(Guid Id) : IQuery<ProductDto?>; // Nullable

// ✅ CORRECT
public record GetQuery(Guid Id) : IQuery<GetProductResult>;
public sealed class GetProductResult 
{ 
    public ProductDto Item { get; init; } 
    public GetProductResult(ProductDto item) => Item = item;
}

// Handler
public sealed class GetHandler(IRepository repo, IMapper map) : IQueryHandler<GetQuery, GetProductResult>
{
    public async Task<GetProductResult> Handle(GetQuery q, CancellationToken ct)
    {
        var entity = await repo.GetByIdAsync(q.Id, ct) 
            ?? throw new NotFoundException(MessageCode.ProductNotFound);
        return new GetProductResult(map.Map<ProductDto>(entity));
    }
}
```

**Result Guidelines:**
- Single item: `Item` property
- Collections: `Items` property (or inherit `PaginationResult<T>`)
- Place in `Application/Models/Results/`
- Throw `NotFoundException` instead of returning null

---

## Domain Modeling

```csharp
// Entity with Factory & Behavior
public sealed class ProductEntity : Aggregate<Guid>
{
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public ProductStatus Status { get; set; }

    public static ProductEntity Create(Guid id, string name, decimal price, string by)
    {
        return new ProductEntity
        {
            Id = id, Name = name, Price = price, Status = ProductStatus.OutOfStock,
            CreatedBy = by, CreatedOnUtc = DateTimeOffset.UtcNow
        };
    }

    public void UpdatePrice(decimal newPrice, string by)
    {
        if (newPrice < 0) throw new DomainException(MessageCode.InvalidPrice);
        Price = newPrice;
        LastModifiedBy = by;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }
}

// Domain Event
public record UpsertedProductDomainEvent(Guid Id, string Name, decimal Price) : IDomainEvent;
```

---

## API Endpoints (Carter)

```csharp
public sealed class CreateProduct : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Product.Create, HandleAsync)
           .WithTags(ApiRoutes.Product.Tags)
           .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status200OK)
           .RequireAuthorization();
    }

    private async Task<ApiCreatedResponse<Guid>> HandleAsync(
        ISender sender, IMapper mapper, [FromBody] CreateProductRequest req)
    {
        var dto = mapper.Map<CreateProductDto>(req);
        var cmd = new CreateProductCommand(dto, Actor.System);
        var result = await sender.Send(cmd);
        return new ApiCreatedResponse<Guid>(result);
    }
}
```

---

## Exception Handling

**🚨 ONLY use these exceptions in Application layer:**
1. `ClientValidationException` - Input/validation errors (400)
2. `NotFoundException` - Resource not found (404)
3. `DomainException` - Domain rule violations (from Domain layer)

**❌ BANNED:** `BadRequestException`, `ArgumentException`, `InvalidOperationException`

```csharp
// ✅ CORRECT
var product = await repo.GetByIdAsync(id, ct) 
    ?? throw new NotFoundException(MessageCode.ProductNotFound);

if (stock < quantity)
    throw new ClientValidationException(MessageCode.InsufficientStock);

// ❌ WRONG
throw new BadRequestException("Invalid"); // Use ClientValidationException
throw new ArgumentException("Invalid");   // Not allowed
```

---

## MessageCode Convention

**🚨 NEVER use string literals in exceptions/validations. ALWAYS use MessageCode.**

```csharp
// ❌ WRONG
throw new NotFoundException("Product not found");
.WithMessage("Name is required");

// ✅ CORRECT
throw new NotFoundException(MessageCode.ProductNotFound);
.WithMessage(MessageCode.ProductNameIsRequired);

// MessageCode.cs
public static class MessageCode
{
    public const string ProductNotFound = "PRODUCT_NOT_FOUND";
    public const string ProductNameIsRequired = "PRODUCT_NAME_IS_REQUIRED";
    // Always UPPER_SNAKE_CASE
}
```

**Workflow:**
1. Check if MessageCode exists in `Common/Constants/MessageCode.cs`
2. If not exists → Add it first
3. Then use it

---

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Entity | XxxEntity | ProductEntity |
| DTO | XxxDto | CreateProductDto |
| Command | XxxCommand | CreateProductCommand |
| Handler | XxxHandler | CreateProductCommandHandler |
| Query | XxxQuery | GetProductsQuery |
| Validator | XxxValidator | CreateProductValidator |
| Repository | IXxxRepository / XxxRepository | IProductRepository |
| Result | XxxResult | GetProductResult |
| Event | XxxDomainEvent / XxxIntegrationEvent | UpsertedProductDomainEvent |

---

## Code Style

### Regions
```csharp
public sealed class MyClass
{
    #region Fields, Properties and Indexers
    private readonly ILogger _logger;
    public string Name { get; set; }
    #endregion

    #region Ctors
    public MyClass(ILogger logger) => _logger = logger;
    #endregion

    #region Implementations
    // Interface implementations
    #endregion

    #region Factories
    public static MyClass Create() => new();
    #endregion

    #region Methods
    public void DoSomething() { }
    #endregion

    #region Private Methods
    private void InternalWork() { }
    #endregion
}
```

### Primary Constructor (Preferred)
```csharp
public sealed class Handler(IRepository repo, IMapper mapper, ILogger<Handler> logger) 
    : ICommandHandler<CreateCmd, Guid>
{
    public async Task<Guid> Handle(CreateCmd cmd, CancellationToken ct) { ... }
}
```

---

## Dependency Injection

### Application
```csharp
public static IServiceCollection AddApplicationServices(this IServiceCollection services)
{
    services.AddMediatR(cfg => {
        cfg.RegisterServicesFromAssembly(typeof(ApplicationMarker).Assembly);
        cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
    });
    services.AddValidatorsFromAssembly(typeof(ApplicationMarker).Assembly);
    services.AddAutoMapper(typeof(ApplicationMarker).Assembly);
    return services;
}
```

### Infrastructure (Scrutor)
```csharp
public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
{
    services.Scan(s => s.FromAssemblyOf<InfrastructureMarker>()
        .AddClasses(c => c.Where(t => t.Name.EndsWith("Repository")))
        .AsImplementedInterfaces().WithScopedLifetime());
    return services;
}
```

---

## Best Practices
1. **Domain Pure**: No dependencies, only domain logic
2. **Factory Methods**: Static `Create()` for entity creation
3. **FluentValidation**: Use `AbstractValidator<T>`, ValidationBehavior handles exceptions
4. **Primary Constructors**: Preferred for handlers
5. **Async All The Way**: Always `async/await` + `CancellationToken`
6. **No Comments**: Code should be self-documenting
7. **File-Scoped Namespaces**: `namespace App.Feature;`
8. **Scrutor**: Auto-register services by naming convention
9. **Result Wrappers**: Never return DTOs/nullable directly
10. **Standard Exceptions**: Only `ClientValidationException`, `NotFoundException`, `DomainException`
