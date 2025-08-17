#region using

using User.Application.Data;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.Users;
using User.Application.Services;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.CQRS.User.Commands;

public record UpdateUserStatusCommand(Guid UserId, UpdateUserStatusDto Dto) : ICommand<ResultSharedResponse<string>>;

public class UpdateUserStatusCommandValidator : AbstractValidator<UpdateUserStatusCommand>
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

public class UpdateUserStatusCommandHandler(
    IApplicationDbContext dbContext,
    IKeycloakService keycloakService) : ICommandHandler<UpdateUserStatusCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UpdateUserStatusCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.UserNotFound);

        var keycloakUser = new KcUserDto
        {
            UserName = user.UserName,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Enabled = command.Dto.Enable,
        };

        await keycloakService.UpdateUserAsync(user.Id.ToString(), keycloakUser);

        return ResultSharedResponse<string>.Success(
            data: keycloakUser.Email!,
            message: MessageCode.CreatedSuccessfully);
    }

    #endregion
}