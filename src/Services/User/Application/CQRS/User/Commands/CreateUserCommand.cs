#region using

using User.Application.Data;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.Users;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;
using User.Application.Services;

#endregion

namespace User.Application.CQRS.User.Commands;

public record CreateUserCommand(CreateUserDto Dto) : ICommand<ResultSharedResponse<string>>;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    #region Ctors

    public CreateUserCommandValidator()
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
            });

    }

    #endregion
}

public class CreateUserCommandHandler(
    IApplicationDbContext dbContext,
    IKeycloakService keycloakService) : ICommandHandler<CreateUserCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(CreateUserCommand command, CancellationToken cancellationToken)
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