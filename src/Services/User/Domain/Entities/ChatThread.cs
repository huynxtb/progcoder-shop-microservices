#region using

using Domain.Abstractions;

#endregion

namespace Domain.Entities;

public class ChatThread : Entity<long>
{
    #region Fields, Properties and Indexers

    // FK → Agent.Id
    public Guid AgentId { get; set; }

    public Agent Agent { get; set; } = new();

    // FK → Keycloak.Id
    public Guid? ParticipationId { get; set; }

    public KeycloakUser? Participation { get; set; }

    // 1 – * → ChatHistory
    public ICollection<ChatHistory>? ChatHistories { get; set; }

    #endregion
}
