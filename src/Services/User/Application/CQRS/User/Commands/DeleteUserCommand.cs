#region using

using User.Application.Data;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;
using User.Application.Services;

#endregion

namespace User.Application.CQRS.User.Commands;

public record DeleteUserCommand(Guid UserId) : ICommand<ResultSharedResponse<string>>;

public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
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

public class DeleteUserCommandHandler(
    IApplicationDbContext dbContext,
    IKeycloakService keycloakService) : ICommandHandler<DeleteUserCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(DeleteUserCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken) 
            ?? throw new NotFoundException(MessageCode.UserNotFound);

        await keycloakService.DeleteUserAsync(user.Id.ToString());

        return ResultSharedResponse<string>.Success(
            data: user.Id.ToString(),
            message: MessageCode.DeletedSuccessfully);
    }

    #endregion
}