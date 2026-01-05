#region using

using Catalog.Application.Dtos.Categories;
using Catalog.Domain.Entities;
using Marten;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Catalog.Application.Features.Category.Commands;

public record UpdateCategoryCommand(Guid CategoryId, UpdateCategoryDto Dto, Actor Actor) : ICommand<Guid>;

public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
    #region Ctors

    public UpdateCategoryCommandValidator()
    {
        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage(MessageCode.CategoryIdIsRequired);

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

public class UpdateCategoryCommandHandler(IDocumentSession session) : ICommandHandler<UpdateCategoryCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateCategoryCommand command, CancellationToken cancellationToken)
    {
        await session.BeginTransactionAsync(cancellationToken);

        var entity = await session.LoadAsync<CategoryEntity>(command.CategoryId, cancellationToken)
            ?? throw new ClientValidationException(MessageCode.CategoryIsNotExists, command.CategoryId);

        var dto = command.Dto;

        // Validate ParentId if provided
        if (dto.ParentId.HasValue)
        {
            // Cannot set parent to itself
            if (dto.ParentId.Value == command.CategoryId)
            {
                throw new ClientValidationException(MessageCode.CategoryCannotBeItsOwnParent);
            }

            var parentExists = await session.Query<CategoryEntity>()
                .AnyAsync(x => x.Id == dto.ParentId.Value, token: cancellationToken);

            if (!parentExists)
            {
                throw new ClientValidationException(MessageCode.CategoryIsNotExists, dto.ParentId.Value);
            }
        }

        entity.Update(
            name: dto.Name!,
            desciption: dto.Description ?? string.Empty,
            slug: dto.Name!.Slugify(),
            performedBy: command.Actor.ToString(),
            parentId: dto.ParentId);

        session.Store(entity);
        await session.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion
}
