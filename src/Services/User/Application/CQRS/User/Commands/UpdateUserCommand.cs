#region using

using Application.Data;
using Application.Dtos.Keycloaks;
using Application.Dtos.Users;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace Application.CQRS.User.Commands;

public record UpdateUserCommand(Guid UserId, UpdateUserDto Dto) : ICommand<ResultSharedResponse<string>>;

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    #region Ctors

    public UpdateUserCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Email)
                    .NotEmpty()
                    .WithMessage(MessageCode.EmailIsRequired)
                    .EmailAddress()
                    .WithMessage(MessageCode.InvalidEmailAddress);

                RuleFor(x => x.Dto.FirstName)
                    .NotEmpty()
                    .WithMessage(MessageCode.FirstNameIsRequired);

                RuleFor(x => x.Dto.LastName)
                    .NotEmpty()
                    .WithMessage(MessageCode.LastNameIsRequired);
            });

    }

    #endregion
}

public class UpdateUserCommandHandler(
    IWriteDbContext dbContext,
    IKeycloakService keycloakService) : ICommandHandler<UpdateUserCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.UserNotFound);

        var keycloakUser = new KcUserDto
        {
            Email = command.Dto.Email,
            FirstName = command.Dto.FirstName,
            LastName = command.Dto.LastName,
        };

        await keycloakService.UpdateUserAsync(user.Id.ToString(), keycloakUser);

        return ResultSharedResponse<string>.Success(
            data: keycloakUser.Email!,
            message: MessageCode.UpdatedSuccessfully);
    }

    #endregion
}