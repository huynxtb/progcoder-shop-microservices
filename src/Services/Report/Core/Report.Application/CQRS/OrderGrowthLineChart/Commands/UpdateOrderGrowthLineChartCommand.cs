#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using Common.Models.Reponses;
using FluentValidation;
using MediatR;
using Report.Application.Data.Repositories;
using Report.Domain.Entities;

#endregion

namespace Report.Application.CQRS.OrderGrowthLineChart.Commands;

public sealed record UpdateOrderGrowthLineChartCommand(Actor Actor) : ICommand<Unit>;

public sealed class CreateOrderGrowthLineChartCommandValidator : AbstractValidator<UpdateOrderGrowthLineChartCommand>
{
    #region Ctors

    public CreateOrderGrowthLineChartCommandValidator()
    {
    }

    #endregion
}

public sealed class CreateOrderGrowthLineChartCommandHandler(
    IOrderGrowthLineChartRepository repository)
    : ICommandHandler<UpdateOrderGrowthLineChartCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(UpdateOrderGrowthLineChartCommand command, CancellationToken cancellationToken)
    {
        return Unit.Value;
    }

    #endregion
}

