#region using

using Report.Application.Data.Repositories;
using Common.ValueObjects;
using MediatR;
using Report.Application.Dtos.DashboardTotals;

#endregion

namespace Report.Application.Features.DashboardTotal.Commands;

public sealed record UpdateDashboardTotalCommand(UpdateDashboardTotalDto Dto, Actor Actor) : ICommand<Unit>;

public sealed class UpdateDashboardTotalCommandValidator : AbstractValidator<UpdateDashboardTotalCommand>
{
    #region Ctors

    public UpdateDashboardTotalCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Title)
                    .NotEmpty()
                    .WithMessage(MessageCode.TitleIsRequired);

                RuleFor(x => x.Dto.Count)
                    .NotEmpty()
                    .WithMessage(MessageCode.CountIsRequired);
            });
    }

    #endregion
}

public sealed class UpdateDashboardTotalCommandHandler(IDashboardTotalRepository repository) : ICommandHandler<UpdateDashboardTotalCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(UpdateDashboardTotalCommand command, CancellationToken cancellationToken)
    {
        var entities = await repository.GetAllAsync(cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        foreach (var entity in entities)
        {
            if (entity.Title == command.Dto.Title)
            {
                entity.UpdateCount(command.Dto.Count!, command.Actor.ToString());
            }
        }

        await repository.BulkUpsertAsync(entities, cancellationToken);

        return Unit.Value;
    }

    #endregion
}

