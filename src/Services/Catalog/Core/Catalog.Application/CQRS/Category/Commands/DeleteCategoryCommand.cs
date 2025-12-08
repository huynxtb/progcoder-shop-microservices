#region using

using Catalog.Domain.Entities;
using Marten;
using MediatR;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Catalog.Application.CQRS.Category.Commands;

public record DeleteCategoryCommand(Guid CategoryId) : ICommand<Unit>;

public class DeleteCategoryCommandValidator : AbstractValidator<DeleteCategoryCommand>
{
    #region Ctors

    public DeleteCategoryCommandValidator()
    {
        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage(MessageCode.CategoryIdIsRequired);
    }

    #endregion
}

public class DeleteCategoryCommandHandler(IDocumentSession session) : ICommandHandler<DeleteCategoryCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteCategoryCommand command, CancellationToken cancellationToken)
    {
        var category = await session.LoadAsync<CategoryEntity>(command.CategoryId, cancellationToken)
            ?? throw new ClientValidationException(MessageCode.CategoryIsNotExists, command.CategoryId.ToString());

        // Check if category has children
        var hasChildren = await session.Query<CategoryEntity>()
            .AnyAsync(x => x.ParentId == command.CategoryId, token: cancellationToken);

        if (hasChildren)
        {
            throw new ClientValidationException(MessageCode.CategoryHasChildren);
        }

        session.Delete<CategoryEntity>(category.Id);
        await session.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}
