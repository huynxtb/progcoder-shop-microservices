#region using

using MediatR;
using Notification.Application.Data.Repositories;
using Notification.Application.Dtos.Notifications;

#endregion

namespace Notification.Application.Features.Notification.Commands;

public sealed record MarkAsReadNotificationCommand(MarkAsReadNotificationDto Dto, Actor Actor) : ICommand<Unit>;

public sealed class MarkAsReadNotificationCommandValidator : AbstractValidator<MarkAsReadNotificationCommand>
{
    #region Ctors

    public MarkAsReadNotificationCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Ids)
                    .NotEmpty()
                    .WithMessage(MessageCode.IdIsRequired);
            });
    }

    #endregion
}

public class MarkAsReadNotificationCommandHandler(
    ICommandNotificationRepository commandRepo,
    IQueryNotificationRepository queryRepo)
    : ICommandHandler<MarkAsReadNotificationCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(MarkAsReadNotificationCommand command, CancellationToken cancellationToken)
    {
        foreach (var id in command.Dto.Ids)
        {
            var doc = await queryRepo.GetNotificationByIdAsync(
            id: id,
            userId: Guid.Parse(command.Actor.ToString()),
            cancellationToken: cancellationToken) ?? throw new NotFoundException(MessageCode.ResourceNotFound);

            doc.MarkAsRead(command.Actor.ToString());

            await commandRepo.UpsertAsync(doc, cancellationToken);
        }

        return Unit.Value;
    }

    #endregion
}