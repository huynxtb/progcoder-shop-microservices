#region using

using User.Application.Data;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.Users;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;
using User.Application.Services;

#endregion

namespace User.Application.CQRS.User.Commands;

public sealed record UpdateUserProfileCommand(Guid UserId, UpdateUserDto Dto) : ICommand<ResultSharedResponse<string>>;

public sealed class UpdateUserProfileCommandValidator : AbstractValidator<UpdateUserProfileCommand>
{
    #region Ctors

    public UpdateUserProfileCommandValidator()
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

public sealed class UpdateUserProfileCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<UpdateUserProfileCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UpdateUserProfileCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var user = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.UserNotFound);

        user.Update(
            email: dto.Email!,
            firstName: dto.FirstName!,
            lastName: dto.LastName!,
            phoneNumber: dto.PhoneNumber!,
            modifiedBy: command.UserId.ToString());

        dbContext.Users.Update(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: user.Id.ToString(),
            message: MessageCode.UpdateSuccess);
    }

    #endregion
}