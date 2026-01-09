#region using

using MediatR;
using Report.Application.Data.Repositories;
using Report.Application.Dtos.TopProductPieCharts;
using Report.Domain.Entities;

#endregion

namespace Report.Application.Features.TopProductPieChart.Commands;

public sealed record UpdateTopProductPieChartCommand(UpdateTopProductPieChartListDto Dto, Actor Actor) : ICommand<Unit>;

public sealed class UpdateTopProductPieChartCommandValidator : AbstractValidator<UpdateTopProductPieChartCommand>
{
    #region Ctors

    public UpdateTopProductPieChartCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest);

        RuleForEach(x => x.Dto.Items)
            .ChildRules(item =>
            {
                item.RuleFor(x => x.Name)
                    .NotEmpty()
                    .WithMessage(MessageCode.NameIsRequired);

                item.RuleFor(x => x.Value)
                    .GreaterThanOrEqualTo(0)
                    .WithMessage(MessageCode.ValueCannotBeNegative);
            });
    }

    #endregion
}

public sealed class UpdateTopProductPieChartCommandHandler(ITopProductPieChartRepository repository)
    : ICommandHandler<UpdateTopProductPieChartCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(UpdateTopProductPieChartCommand command, CancellationToken cancellationToken)
    {
        if (!command.Dto.Items.Any())
        {
            return Unit.Value;
        }

        var existingEntities = await repository.GetTopProductsAsync(limit: 100, cancellationToken);

        foreach (var dto in command.Dto.Items)
        {
            var existingEntity = existingEntities.FirstOrDefault(x => x.Name == dto.Name);

            if (existingEntity != null)
            {
                existingEntity.UpdateValue(dto.Value, command.Actor.ToString());
            }
            else
            {
                var newEntity = TopProductPieChartEntity.Create(
                    name: dto.Name,
                    value: dto.Value,
                    performedBy: command.Actor.ToString());

                existingEntities.Add(newEntity);
            }
        }

        await repository.BulkUpsertAsync(existingEntities, cancellationToken);

        return Unit.Value;
    }

    #endregion
}


