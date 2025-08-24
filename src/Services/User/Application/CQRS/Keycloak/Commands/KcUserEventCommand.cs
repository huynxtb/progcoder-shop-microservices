#region using

using User.Application.Data;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.LoginHistories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SourceCommon.Configurations;
using SourceCommon.Models.Reponses;
using User.Application.CQRS.LoginHistory.Commands;
using User.Domain.Entities;
using User.Application.Constants;

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
        var dto = command.Dto;
        var user = await dbContext.Users.SingleOrDefaultAsync(x => x.UserName == dto.Username! || x.KeycloakUserNo == dto.Id);

        switch (dto.Action)
        {
            case KeycloakUserEvent.Created when user is null:
                await CreateUserAsync(dto);
                break;

            case KeycloakUserEvent.Created:
                UpdateUser(dto, user!);
                break;

            case KeycloakUserEvent.Updated or
            KeycloakUserEvent.Deleted or
            KeycloakUserEvent.VerifyEmail or
            KeycloakUserEvent.Login when user is null:
                throw new NotFoundException(MessageCode.UserNotFound);

            case KeycloakUserEvent.Updated:
                UpdateUser(dto, user!);
                break;

            case KeycloakUserEvent.Deleted:
                DeleteUser(user!);
                break;

            case KeycloakUserEvent.VerifyEmail:
                VerifyEmail(user!, dto.EmailVerified);
                break;

            case KeycloakUserEvent.Login:
                await CreateLoginHistoryAsync(user!, dto);
                break;

            default:
                return ResultSharedResponse<string>.Failure(message: MessageCode.UpdateFailure);
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: dto.Id!.ToString(),
            message: MessageCode.UpdateSuccess);
    }

    #endregion

    #region Methods

    private async Task CreateUserAsync(KcUserEventDto user)
    {
        var entity = UserEntity.Create(
            id: Guid.NewGuid(),
            keycloakUserNo: user.Id!,
            userName: user.Username!,
            email: user.Email!,
            emailVerified: user.EmailVerified,
            isActive: user.Enabled,
            phoneNumber: user.Attributes!.FirstOrDefault(x => x.Key == KeycloakUserAttributes.FirstName)?.Value ?? string.Empty,
            firstName: user.Attributes!.FirstOrDefault(x => x.Key == KeycloakUserAttributes.FirstName)?.Value ?? string.Empty,
            lastName: user.Attributes!.FirstOrDefault(x => x.Key == KeycloakUserAttributes.LastName)?.Value ?? string.Empty,
            createdBy: SystemConst.CreatedByKeycloak);

        await dbContext.Users.AddAsync(entity);
    }

    private void UpdateUser(KcUserEventDto user, UserEntity userEntity)
    {
        userEntity.Update(
            keycloakUserNo: user.Id!,
            email: user.Email!,
            phoneNumber: user.Attributes!.FirstOrDefault(x => x.Key == KeycloakUserAttributes.PhoneNumber)?.Value ?? string.Empty,
            emailVerified: user.EmailVerified,
            isActive: user.Enabled,
            firstName: user.Attributes!.FirstOrDefault(x => x.Key == KeycloakUserAttributes.FirstName)?.Value ?? string.Empty,
            lastName: user.Attributes!.FirstOrDefault(x => x.Key == KeycloakUserAttributes.LastName)?.Value ?? string.Empty,
            modifiedBy: SystemConst.CreatedByKeycloak);

        dbContext.Users.Update(userEntity);
    }

    private void DeleteUser(UserEntity user)
    {
        user.Delete(SystemConst.CreatedByKeycloak);
        dbContext.Users.Remove(user);
    }

    private void VerifyEmail(UserEntity user, bool emailVerified)
    {
        user.VerifyEmail(emailVerified);
        dbContext.Users.Update(user);
    }

    private async Task CreateLoginHistoryAsync(UserEntity user, KcUserEventDto kcDto)
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