#region using

using Application.Data;
using Application.Dtos.Users;
using SourceCommon.Models.Reponses;

#endregion

namespace Application.CQRS.User.Commands;

public record CreateUserCommand(CreateUserDto User, string UserIdentityId) : ICommand<ResultSharedResponse<string>>;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    #region Ctors

    public CreateUserCommandValidator()
    {
        RuleFor(x => x.User)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.User.UserName)
                    .NotEmpty()
                    .WithMessage(MessageCode.UserNameIsRequired);

                RuleFor(x => x.User.Email)
                    .NotEmpty()
                    .WithMessage(MessageCode.EmailIsRequired)
                    .EmailAddress()
                    .WithMessage(MessageCode.InvalidEmailAddress);

                RuleFor(x => x.User.FirstName)
                    .NotEmpty()
                    .WithMessage(MessageCode.FirstNameIsRequired);

                RuleFor(x => x.User.LastName)
                    .NotEmpty()
                    .WithMessage(MessageCode.LastNameIsRequired);

                RuleFor(x => x.User.Password)
                    .NotEmpty()
                    .WithMessage(MessageCode.PasswordIsRequired)
                    .MinimumLength(5)
                    .WithMessage(MessageCode.Min5Characters);

                RuleFor(x => x.User.ConfirmPassword)
                    .NotEmpty()
                    .WithMessage(MessageCode.ConfirmPasswordIsRequired)
                    .Equal(x => x.User.Password)
                    .WithMessage(MessageCode.ConfirmPasswordIsNotMatch);

            });

    }

    #endregion
}

public class CreateUserCommandHandler(IWriteDbContext dbContext) : ICommandHandler<CreateUserCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(CreateUserCommand command, CancellationToken cancellationToken)
    {
        var uuid = Guid.NewGuid();

        var entity = Domain.Entities.User.Create(id: uuid,
            userName: command.User.UserName!,
            email: command.User.Email!,
            password: command.User.Password!,
            firstName: command.User.FirstName!,
            lastName: command.User.LastName!,
            modifiedBy: command.UserIdentityId);

        await dbContext.Users.AddAsync(entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.CreatedSuccessfully);
    }

    #endregion
}