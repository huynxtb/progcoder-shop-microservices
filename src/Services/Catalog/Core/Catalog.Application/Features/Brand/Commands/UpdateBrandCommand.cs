#region using

using Catalog.Application.Dtos.Brands;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.Features.Brand.Commands;

public record UpdateBrandCommand(Guid BrandId, UpdateBrandDto Dto, Actor Actor) : ICommand<Guid>;

public class UpdateBrandCommandValidator : AbstractValidator<UpdateBrandCommand>
{
    #region Ctors

    public UpdateBrandCommandValidator()
    {
        RuleFor(x => x.BrandId)
            .NotEmpty()
            .WithMessage(MessageCode.BrandIdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Name)
                    .NotEmpty()
                    .WithMessage(MessageCode.BrandNameIsRequired);
            });
    }

    #endregion
}

public class UpdateBrandCommandHandler(IDocumentSession session) : ICommandHandler<UpdateBrandCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateBrandCommand command, CancellationToken cancellationToken)
    {
        await session.BeginTransactionAsync(cancellationToken);

        var entity = await session.LoadAsync<BrandEntity>(command.BrandId, cancellationToken)
            ?? throw new ClientValidationException(MessageCode.BrandIsNotExists, command.BrandId);

        var dto = command.Dto;

        entity.Update(
            name: dto.Name!,
            slug: dto.Name!.Slugify(),
            performedBy: command.Actor.ToString());

        session.Store(entity);
        await session.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion
}
