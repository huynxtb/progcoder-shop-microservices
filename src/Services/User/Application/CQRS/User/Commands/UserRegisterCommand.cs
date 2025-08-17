#region using

using User.Application.Data;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.Users;
using User.Application.Services;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.CQRS.User.Commands;

public record UserRegisterCommand(UserRegisterDto Dto) : ICommand<ResultSharedResponse<string>>;

public class UserRegisterCommandValidator : AbstractValidator<UserRegisterCommand>
{
    #region Ctors

    public UserRegisterCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.UserName)
                    .NotEmpty()
                    .WithMessage(MessageCode.UserNameIsRequired);

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

                RuleFor(x => x.Dto.Password)
                    .NotEmpty()
                    .WithMessage(MessageCode.PasswordIsRequired)
                    .MinimumLength(5)
                    .WithMessage(MessageCode.Min5Characters);

                RuleFor(x => x.Dto.ConfirmPassword)
                    .NotEmpty()
                    .WithMessage(MessageCode.ConfirmPasswordIsRequired)
                    .Equal(x => x.Dto.Password)
                    .WithMessage(MessageCode.ConfirmPasswordIsNotMatch);

            });

    }

    #endregion
}

public class UserRegisterCommandHandler(
    IApplicationDbContext dbContext,
    IKeycloakService keycloakService) : ICommandHandler<UserRegisterCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UserRegisterCommand command, CancellationToken cancellationToken)
    {
        var existingEmail = await dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.Email == command.Dto.Email, cancellationToken);

        if (existingEmail)
            throw new BadRequestException(MessageCode.EmailAlreadyExists);

        var existingUsername = await dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.UserName == command.Dto.UserName, cancellationToken);

        if (existingUsername)
            throw new BadRequestException(MessageCode.UserNameAlreadyExists);

        var keycloakUser = new KcUserDto
        {
            UserName = command.Dto.UserName,
            Email = command.Dto.Email,
            FirstName = command.Dto.FirstName,
            LastName = command.Dto.LastName,
            Credentials =
            [
                new()
                {
                    Type = "password",
                    Value = command.Dto.Password,
                    Temporary = false
                }
            ],
        };

        await keycloakService.CreateUserAsync(keycloakUser);

        return ResultSharedResponse<string>.Success(
            data: keycloakUser.Email!,
            message: MessageCode.CreatedSuccessfully);
    }

    #endregion
}