#region using

using Domain.Abstractions;

#endregion

namespace Domain.Entities;

public class ChatHistory : Entity<long>
{
    #region Fields, Properties and Indexers

    // FK → ChatThread.Id
    public long ChatThreadId { get; set; }

    public ChatThread ChatThread { get; set; } = new();

    // FK → Keycloak.Id
    public Guid SenderId { get; set; }

    public KeycloakUser Sender { get; set; } = new();

    public string Message { get; set; } = default!;

    #endregion
}
