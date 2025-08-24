#region using

using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;
using User.Application.Data;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.Users;
using User.Application.Services;
using User.Domain.Entities;

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

public class UserRegisterCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<UserRegisterCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UserRegisterCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var conflicts = await dbContext.Users
            .AsNoTracking()
            .Where(u => u.Email == dto.Email || u.UserName == dto.UserName)
            .Select(u => new { u.Email, u.UserName })
            .ToListAsync(cancellationToken);

        var emailClash = conflicts.Any(x => x.Email == dto.Email);
        var userNameClash = conflicts.Any(x => x.UserName == dto.UserName);

        if (emailClash)
            throw new BadRequestException(MessageCode.EmailAlreadyExists);
        if (userNameClash)
            throw new BadRequestException(MessageCode.UserNameAlreadyExists);

        var entity = UserEntity.Create(
            id: Guid.NewGuid(),
            userName: dto.UserName!,
            password: dto.Password!,
            email: dto.Email!,
            firstName: dto.FirstName!,
            lastName: dto.LastName!,
            createdBy: SystemConst.CreatedBySystem);

        dbContext.Users.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.CreateSuccess);
    }

    #endregion
}