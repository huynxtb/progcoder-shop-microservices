#region using

using Catalog.Domain.Entities;
using Marten;
using MediatR;

#endregion

namespace Catalog.Application.CQRS.Brand.Commands;

public record DeleteBrandCommand(Guid BrandId) : ICommand<Unit>;

public class DeleteBrandCommandValidator : AbstractValidator<DeleteBrandCommand>
{
    #region Ctors

    public DeleteBrandCommandValidator()
    {
        RuleFor(x => x.BrandId)
            .NotEmpty()
            .WithMessage(MessageCode.BrandIdIsRequired);
    }

    #endregion
}

public class DeleteBrandCommandHandler(IDocumentSession session) : ICommandHandler<DeleteBrandCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteBrandCommand command, CancellationToken cancellationToken)
    {
        var brand = await session.LoadAsync<BrandEntity>(command.BrandId, cancellationToken)
            ?? throw new ClientValidationException(MessageCode.BrandIsNotExists, command.BrandId.ToString());

        session.Delete<BrandEntity>(brand.Id);
        await session.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}
