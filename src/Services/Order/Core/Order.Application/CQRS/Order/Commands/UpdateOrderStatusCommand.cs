#region using

using Microsoft.EntityFrameworkCore;
using Order.Application.Data;
using Order.Domain.Enums;

#endregion

namespace Order.Application.CQRS.Order.Commands;

public sealed record UpdateOrderStatusCommand(
    Guid OrderId,
    OrderStatus Status,
    string? Reason,
    Actor Actor) : ICommand<Guid>;

public sealed class UpdateOrderStatusCommandValidator : AbstractValidator<UpdateOrderStatusCommand>
{
    #region Ctors

    public UpdateOrderStatusCommandValidator()
    {
        RuleFor(x => x.OrderId)
            .NotEmpty()
            .WithMessage(MessageCode.OrderIdIsRequired);

        RuleFor(x => x.Status)
            .Must(status => Enum.IsDefined(typeof(OrderStatus), status))
            .WithMessage(MessageCode.InvalidOrderStatus);

        When(x => x.Status == OrderStatus.Canceled, () =>
        {
            RuleFor(x => x.Reason)
                .NotEmpty()
                .WithMessage(MessageCode.CancelReasonIsRequired)
                .MaximumLength(255)
                .WithMessage(MessageCode.Max255Characters);
        });

        When(x => x.Status == OrderStatus.Refunded, () =>
        {
            RuleFor(x => x.Reason)
                .NotEmpty()
                .WithMessage(MessageCode.RefundReasonIsRequired)
                .MaximumLength(255)
                .WithMessage(MessageCode.Max255Characters);
        });
    }

    #endregion
}

public sealed class UpdateOrderStatusCommandHandler(IApplicationDbContext dbContext)
    : ICommandHandler<UpdateOrderStatusCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateOrderStatusCommand command, CancellationToken cancellationToken)
    {
        var order = await dbContext.Orders
            .FirstOrDefaultAsync(x => x.Id == command.OrderId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, command.OrderId);

        if (order.Status == OrderStatus.Delivered ||
            order.Status == OrderStatus.Canceled ||
            order.Status == OrderStatus.Refunded)
        {
            throw new ClientValidationException(MessageCode.OrderStatusCannotBeUpdated);
        }

        if (order.Status == command.Status)
        {
            throw new ClientValidationException(MessageCode.OrderStatusSameAsCurrent);
        }

        var performedBy = command.Actor.ToString();

        switch (command.Status)
        {
            case OrderStatus.Canceled:
                if (string.IsNullOrWhiteSpace(command.Reason))
                {
                    throw new ClientValidationException(MessageCode.CancelReasonIsRequired);
                }
                order.CancelOrder(command.Reason!, performedBy);
                break;

            case OrderStatus.Refunded:
                if (string.IsNullOrWhiteSpace(command.Reason))
                {
                    throw new ClientValidationException(MessageCode.RefundReasonIsRequired);
                }
                order.RefundOrder(command.Reason!, performedBy);
                break;
            
            case OrderStatus.Delivered:
                order.OrderDelivered(performedBy);
                break;

            default:
                order.UpdateStatus(command.Status, performedBy);
                break;
        }

        dbContext.Orders.Update(order);
        await dbContext.SaveChangesAsync(cancellationToken);

        return order.Id;
    }

    #endregion
}
