#region using

using User.Application.Data;
using User.Application.Dtos.LoginHistories;
using User.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.CQRS.User.Commands;

public record CreateLoginHistoryCommand(CreateLoginHistoryDto Dto) : ICommand<ResultSharedResponse<string>>;

public class CreateLoginHistoryCommandValidator : AbstractValidator<CreateLoginHistoryCommand>
{
    #region Ctors

    public CreateLoginHistoryCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.IpAddress)
                    .NotEmpty()
                    .WithMessage(MessageCode.UserNameIsRequired);

                RuleFor(x => x.Dto.UserId)
                    .NotEmpty()
                    .WithMessage(MessageCode.UserIdIsRequired);
            });

    }

    #endregion
}

public class CreateLoginHistoryCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<CreateLoginHistoryCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(CreateLoginHistoryCommand command, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == command.Dto.UserId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.UserNotFound);

        var entity = LoginHistory.Create(
            id: Guid.NewGuid(),
            userId: user.Id,
            ipAddress: command.Dto.IpAddress,
            loggedAt: DateTimeOffset.UtcNow,
            createdBy: SystemConst.CreatedBySystem);

        await dbContext.LoginHistories.AddAsync(entity, cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.CreatedSuccessfully);
    }

    #endregion
}