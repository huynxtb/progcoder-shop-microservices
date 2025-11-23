#region using

using FluentValidation;
using Report.Application.Data.Repositories;
using BuildingBlocks.Abstractions.ValueObjects;
using Common.Models.Reponses;
using Common.Constants;
using MediatR;

#endregion

namespace Report.Application.CQRS.DashboardTotal.Commands;

public sealed record UpdateDashboardTotalCommand(Actor Actor) : ICommand<Unit>;

public sealed class UpdateDashboardTotalCommandValidator : AbstractValidator<UpdateDashboardTotalCommand>
{
    #region Ctors

    public UpdateDashboardTotalCommandValidator()
    {
    }

    #endregion
}

public sealed class UpdateDashboardTotalCommandHandler(
    IDashboardTotalRepository repository)
    : ICommandHandler<UpdateDashboardTotalCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(UpdateDashboardTotalCommand command, CancellationToken cancellationToken)
    {
        var entities = await repository.GetAllAsync(cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        foreach (var entity in entities)
        {

        }

        return Unit.Value;
    }

    #endregion
}

