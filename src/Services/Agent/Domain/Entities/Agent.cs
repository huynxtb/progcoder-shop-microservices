#region using

using Domain.Abstractions;
using Domain.Events;
using System.Net;

#endregion

namespace Domain.Entities;

public class Agent : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public long OwnerId { get; set; }

    public AccountProfile? Owner { get; set; }

    public string? Name { get; set; }
    
    public string? Description { get; set; }
    
    public string? Instruction { get; set; }
    
    public string? AvatarUrl { get; set; }

    // 1 – * → ChatThread
    public ICollection<ChatThread>? ChatThreads { get; set; }

    #endregion

    #region Methods

    public static Agent Create(Guid id, 
        string name, 
        string desc,
        string instruction,
        string avatarUrl,
        string modifiedBy)
    {
        var agent = new Agent
        {
            Id = id,
            Name = name,
            Description = desc,
            Instruction = instruction,
            AvatarUrl = avatarUrl,
            CreatedBy = modifiedBy,
            LastModifiedBy = modifiedBy,
        };

        agent.AddDomainEvent(new AgentCreatedEvent(agent));

        return agent;
    }

    #endregion
}
