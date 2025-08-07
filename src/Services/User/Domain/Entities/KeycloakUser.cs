#region using

using Domain.Abstractions;
using Domain.Events;
using Newtonsoft.Json;

#endregion

namespace Domain.Entities;

public class KeycloakUser : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    // 1 – 1 ← AccountProfile
    public AccountProfile AccountProfile { get; set; } = new();

    // 1 – * ← ChatThread (participation)
    public ICollection<ChatThread>? Participations { get; set; }

    // 1 – * ← ChatHistory (as sender)
    public ICollection<ChatHistory>? ChatHistories { get; set; }

    #endregion

    #region Methods

    public static KeycloakUser Create(Guid keycloakUserNo,
        string username,
        string email,
        string firstName,
        string lastName,
        string modifiedBy)
    {
        var bioObj = new
        {
            Username = username,
            Email = email,
            FirstName = firstName,
            LastName = lastName
        };

        var acc = Entities.AccountProfile.Create(
            keycloakUserNo: keycloakUserNo,
            bio: JsonConvert.SerializeObject(bioObj),
            modifiedBy: modifiedBy);

        var user = new KeycloakUser
        {
            Id = keycloakUserNo,
            CreatedBy = modifiedBy,
            LastModifiedBy = modifiedBy,
            AccountProfile = acc
        };

        user.AddDomainEvent(new KeycloakCreatedEvent(user));

        return user;
    }

    #endregion
}
