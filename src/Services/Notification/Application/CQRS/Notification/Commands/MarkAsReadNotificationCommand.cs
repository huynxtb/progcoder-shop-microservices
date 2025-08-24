#region using

using Notification.Application.Data.Repositories;
using SourceCommon.Models.Reponses;

#endregion

namespace Notification.Application.CQRS.Notification.Commands;

public sealed record MarkAsReadNotificationCommand(Guid Id, Guid UserId) : ICommand<ResultSharedResponse<string>>;

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
    : ICommandHandler<MarkAsReadNotificationCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(MarkAsReadNotificationCommand command, CancellationToken cancellationToken)
    {
        var doc = await queryRepo.GetNotificationByIdAsync(
            id: command.Id,
            userId: command.UserId,
            cancellationToken: cancellationToken) ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        doc.MarkAsRead(command.UserId.ToString());
        
        await commandRepo.UpsertAsync(doc, cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: doc.Id.ToString(),
            message: MessageCode.UpdateSuccess);
    }

    #endregion
}