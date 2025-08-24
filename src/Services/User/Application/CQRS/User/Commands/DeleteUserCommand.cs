#region using

using User.Application.Data;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;
using User.Application.Services;

#endregion

namespace User.Application.CQRS.User.Commands;

public sealed record DeleteUserCommand(Guid UserId, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

public sealed class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
{
    #region Ctors

    public DeleteUserCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage(MessageCode.UserIdIsRequired);
    }

    #endregion
}

public sealed class DeleteUserCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<DeleteUserCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(DeleteUserCommand command, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken) 
            ?? throw new NotFoundException(MessageCode.UserNotFound);

        entity.Delete();

        dbContext.Users.Remove(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: command.UserId.ToString(),
            message: MessageCode.DeleteSuccess);
    }

    #endregion
}