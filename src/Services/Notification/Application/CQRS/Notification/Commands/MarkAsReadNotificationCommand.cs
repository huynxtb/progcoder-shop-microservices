#region using

using Notification.Application.Data.Repositories;
using Common.Models.Reponses;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Notification.Application.CQRS.Notification.Commands;

public sealed record MarkAsReadNotificationCommand(Guid Id, Actor Actor) : ICommand<Guid>;

public sealed class MarkAsReadNotificationCommandValidator : AbstractValidator<MarkAsReadNotificationCommand>
{
    #region Ctors

    public MarkAsReadNotificationCommandValidator()
    {
    }

    #endregion
}

public class MarkAsReadNotificationCommandHandler(
    ICommandNotificationRepository commandRepo,
    IQueryNotificationRepository queryRepo) 
    : ICommandHandler<MarkAsReadNotificationCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(MarkAsReadNotificationCommand command, CancellationToken cancellationToken)
    {
        var doc = await queryRepo.GetNotificationByIdAsync(
            id: command.Id,
            userId: Guid.Parse(command.Actor.ToString()),
            cancellationToken: cancellationToken) ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        doc.MarkAsRead(command.Actor.ToString());
        
        await commandRepo.UpsertAsync(doc, cancellationToken);

        return doc.Id;
    }

    #endregion
}