#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using Common.Models.Reponses;
using FluentValidation;
using MediatR;
using Report.Application.Data.Repositories;
using Report.Domain.Entities;

#endregion

namespace Report.Application.CQRS.TopProductPieChart.Commands;

public sealed record UpdateTopProductPieChartCommand(Actor Actor) : ICommand<Unit>;

public sealed class CreateTopProductPieChartCommandValidator : AbstractValidator<UpdateTopProductPieChartCommand>
{
    #region Ctors

    public CreateTopProductPieChartCommandValidator()
    {
    }

    #endregion
}

public sealed class CreateTopProductPieChartCommandHandler(
    ITopProductPieChartRepository repository)
    : ICommandHandler<UpdateTopProductPieChartCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(UpdateTopProductPieChartCommand command, CancellationToken cancellationToken)
    {
        return Unit.Value;
    }

    #endregion
}

