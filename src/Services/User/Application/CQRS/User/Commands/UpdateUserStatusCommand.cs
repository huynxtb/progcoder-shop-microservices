#region using

using User.Application.Data;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.Users;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;
using User.Application.Services;

#endregion

namespace User.Application.CQRS.User.Commands;

public sealed record UpdateUserStatusCommand(Guid UserId, UpdateUserStatusDto Dto, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

public sealed class UpdateUserStatusCommandValidator : AbstractValidator<UpdateUserStatusCommand>
{
    #region Ctors

    public UpdateUserStatusCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);
    }

    #endregion
}

public sealed class UpdateUserStatusCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<UpdateUserStatusCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UpdateUserStatusCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.UserNotFound);

        user.ChangeStatus(command.Dto.Enable, command.CurrentUserId.ToString());
        
        dbContext.Users.Update(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: user.Id.ToString(),
            message: MessageCode.CreateSuccess);
    }

    #endregion
}