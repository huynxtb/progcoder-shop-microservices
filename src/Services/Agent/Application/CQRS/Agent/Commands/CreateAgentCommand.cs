#region using

using Application.Data;
using Application.Dtos.Agent;
using SourceCommon.Models.Reponse;

#endregion

namespace Application.CQRS.Agent.Commands;

public record CreateAgentCommand(CreateAgentDto Agent, string UserIdentityId) : ICommand<ResultSharedResponse<string>>;

public class CreateAgentCommandValidator : AbstractValidator<CreateAgentCommand>
{
    #region Ctors

    public CreateAgentCommandValidator()
    {
        RuleFor(x => x.Agent.Name)
           .NotEmpty()
           .WithMessage(MessageCode.AgentNameIsRequired);

    }

    #endregion
}

public class CreateAgentCommandHandler(IWriteDbContext dbContext) : ICommandHandler<CreateAgentCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(CreateAgentCommand command, CancellationToken cancellationToken)
    {
        var entity = Domain.Entities.Agent.Create(id: Guid.NewGuid(),
            name: command.Agent.Name!,
            desc: command.Agent.Description!,
            instruction: command.Agent.Instruction!,
            avatarUrl: command.Agent.AvatarUrl!,
            modifiedBy: command.UserIdentityId);

        await dbContext.Agents.AddAsync(entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.CreatedSuccessfully);
    }

    #endregion
}