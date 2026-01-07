#region using

using Common.ValueObjects;
using MediatR;
using Report.Application.Data.Repositories;
using Report.Application.Dtos.OrderGrowthLineCharts;
using Report.Domain.Entities;

#endregion

namespace Report.Application.Features.OrderGrowthLineChart.Commands;

public sealed record UpdateOrderGrowthLineChartCommand(UpdateOrderGrowthLineChartListDto Dto, Actor Actor) : ICommand<Unit>;

public sealed class UpdateOrderGrowthLineChartCommandValidator : AbstractValidator<UpdateOrderGrowthLineChartCommand>
{
    #region Ctors

    public UpdateOrderGrowthLineChartCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest);

        RuleForEach(x => x.Dto.Items)
            .ChildRules(item =>
            {
                item.RuleFor(x => x.Day)
                    .InclusiveBetween(1, 31)
                    .WithMessage(MessageCode.InvalidDayRange);

                item.RuleFor(x => x.Value)
                    .GreaterThanOrEqualTo(0)
                    .WithMessage(MessageCode.ValueCannotBeNegative);
            });
    }

    #endregion
}

public sealed class UpdateOrderGrowthLineChartCommandHandler(IOrderGrowthLineChartRepository repository)
    : ICommandHandler<UpdateOrderGrowthLineChartCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(UpdateOrderGrowthLineChartCommand command, CancellationToken cancellationToken)
    {
        if (!command.Dto.Items.Any())
        {
            return Unit.Value;
        }

        var groupedByDate = command.Dto.Items
            .GroupBy(x => new { x.Date.Year, x.Date.Month })
            .ToList();

        foreach (var group in groupedByDate)
        {
            var year = group.Key.Year;
            var month = group.Key.Month;

            var existingEntities = await repository.GetByMonthAsync(year, month, cancellationToken);

            foreach (var dto in group)
            {
                var existingEntity = existingEntities.FirstOrDefault(x => x.Day == dto.Day);

                if (existingEntity != null)
                {
                    existingEntity.UpdateValue(dto.Value, command.Actor.ToString());
                }
                else
                {
                    var newEntity = OrderGrowthLineChartEntity.Create(
                        day: dto.Day,
                        value: dto.Value,
                        date: dto.Date,
                        performedBy: command.Actor.ToString());

                    existingEntities.Add(newEntity);
                }
            }

            await repository.BulkUpsertAsync(existingEntities, cancellationToken);
        }

        return Unit.Value;
    }

    #endregion
}


