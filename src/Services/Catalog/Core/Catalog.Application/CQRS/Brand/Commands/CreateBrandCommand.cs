#region using

using Catalog.Application.Dtos.Brands;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.CQRS.Brand.Commands;

public record CreateBrandCommand(CreateBrandDto Dto, Actor Actor) : ICommand<Guid>;

public class CreateBrandCommandValidator : AbstractValidator<CreateBrandCommand>
{
    #region Ctors

    public CreateBrandCommandValidator()
    {
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

public class CreateBrandCommandHandler(IDocumentSession session) : ICommandHandler<CreateBrandCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateBrandCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        await session.BeginTransactionAsync(cancellationToken);

        var entity = BrandEntity.Create(
            id: Guid.NewGuid(),
            name: dto.Name!,
            slug: dto.Name!.Slugify(),
            performedBy: command.Actor.ToString());

        session.Store(entity);
        await session.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion
}
