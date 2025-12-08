#region using

using Catalog.Application.Dtos.Categories;
using Catalog.Domain.Entities;
using Marten;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Catalog.Application.CQRS.Category.Commands;

public record CreateCategoryCommand(CreateCategoryDto Dto, Actor Actor) : ICommand<Guid>;

public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    #region Ctors

    public CreateCategoryCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Name)
                    .NotEmpty()
                    .WithMessage(MessageCode.CategoryNameIsRequired);
            });
    }

    #endregion
}

public class CreateCategoryCommandHandler(IDocumentSession session) : ICommandHandler<CreateCategoryCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateCategoryCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        await session.BeginTransactionAsync(cancellationToken);

        // Validate ParentId if provided
        if (dto.ParentId.HasValue)
        {
            var parentExists = await session.Query<CategoryEntity>()
                .AnyAsync(x => x.Id == dto.ParentId.Value, token: cancellationToken);

            if (!parentExists)
            {
                throw new ClientValidationException(MessageCode.CategoryIsNotExists, dto.ParentId.Value);
            }
        }

        var entity = CategoryEntity.Create(
            id: Guid.NewGuid(),
            name: dto.Name!,
            desctiption: dto.Description ?? string.Empty,
            slug: dto.Name!.Slugify(),
            performedBy: command.Actor.ToString(),
            parentId: dto.ParentId);

        session.Store(entity);
        await session.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion
}
