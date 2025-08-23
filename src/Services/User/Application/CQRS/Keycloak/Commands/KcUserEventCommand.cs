#region using

using User.Application.Data;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.LoginHistories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SourceCommon.Configurations;
using SourceCommon.Models.Reponses;
using SourceSourceCommon.Constants;
using User.Application.CQRS.LoginHistory.Commands;

#endregion

namespace User.Application.CQRS.Keycloak.Commands;

public record KcUserEventCommand(KcUserEventDto Dto, string ApiKey) : ICommand<ResultSharedResponse<string>>;

public class KeycloakUserEventCommandValidator : AbstractValidator<KcUserEventCommand>
{
    #region Ctors

    public KeycloakUserEventCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Action)
                    .NotEmpty()
                    .WithMessage(MessageCode.ActionIsRequired);
            });
    }

    #endregion
}

public class KeycloakUserEventCommandHandler(
    IApplicationDbContext dbContext,
    ISender sender,
    IConfiguration cfg) : ICommandHandler<KcUserEventCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(KcUserEventCommand command, CancellationToken cancellationToken)
    {
        if (cfg[$"{AppConfigCfg.Section}:{AppConfigCfg.ApiKey}"] != command.ApiKey)
        {
            throw new UnauthorizedException(MessageCode.Unauthorized);
        }

        var user = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == Guid.Parse(command.Dto.Id!));

        switch (command.Dto.Action)
        {
            case KeycloakUserEvent.Created:
                await CreateUserAsync(command.Dto);
                break;
            case KeycloakUserEvent.Updated:
                if (user == null) throw new NotFoundException(MessageCode.UserNotFound);
                UpdateUser(command.Dto, user);
                break;
            case KeycloakUserEvent.Deleted:
                if (user == null) throw new NotFoundException(MessageCode.UserNotFound);
                DeleteUser(user);
                break;
            case KeycloakUserEvent.VerifyEmail:
                if (user == null) throw new NotFoundException(MessageCode.UserNotFound);
                VerifyEmail(user, command.Dto.EmailVerified);
                break;
            case KeycloakUserEvent.Login:
                if (user == null) throw new NotFoundException(MessageCode.UserNotFound);
                await CreateLoginHistoryAsync(user, command.Dto);
                break;
            default:
                break;
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: command.Dto.Id!.ToString(),
            message: MessageCode.UpdatedSuccessfully);
    }

    #endregion

    #region Methods

    private async Task<Domain.Entities.UserEntity> CreateUserAsync(KcUserEventDto user)
    {
        var entity = Domain.Entities.UserEntity.Create(
            id: Guid.Parse(user.Id!),
            userName: user.Username!,
            email: user.Email!,
            emailVerified: user.EmailVerified,
            isActive: user.Enabled,
            phoneNumber: "",
            firstName: user.Attributes!.FirstOrDefault(x => x.Key == "firstName")?.Value ?? string.Empty,
            lastName: user.Attributes!.FirstOrDefault(x => x.Key == "lastName")?.Value ?? string.Empty,
            createdBy: user.RealmName!);

        await dbContext.Users.AddAsync(entity);

        return entity;
    }

    private void UpdateUser(KcUserEventDto user, Domain.Entities.UserEntity existingUser)
    {
        existingUser.Update(
            userName: user.Username!,
            email: user.Email!,
            phoneNumber: "",
            emailVerified: user.EmailVerified,
            isActive: user.Enabled,
            firstName: user.Attributes!.FirstOrDefault(x => x.Key == "firstName")?.Value ?? existingUser.FirstName!,
            lastName: user.Attributes!.FirstOrDefault(x => x.Key == "lastName")?.Value ?? existingUser.LastName!,
            modifiedBy: user.RealmName!);

        dbContext.Users.Update(existingUser);
    }

    private void DeleteUser(Domain.Entities.UserEntity user)
    {
        user.Delete();
        dbContext.Users.Remove(user);
    }

    private void VerifyEmail(Domain.Entities.UserEntity user, bool emailVerified)
    {
        user.VerifyEmail(emailVerified);
        dbContext.Users.Update(user);
    }

    private async Task CreateLoginHistoryAsync(Domain.Entities.UserEntity user, KcUserEventDto kcDto)
    {
        var dto = new CreateLoginHistoryDto()
        {
            IpAddress = kcDto.IpAddress,
            UserId = user.Id,
        };

        await sender.Send(new CreateLoginHistoryCommand(dto));
    }

    #endregion
}