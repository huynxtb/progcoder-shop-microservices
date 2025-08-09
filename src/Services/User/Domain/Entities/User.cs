#region using

using Domain.Abstractions;
using Domain.Events;
using System.Net;

#endregion

namespace Domain.Entities;

public sealed class User : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string? UserName { get; private set; }

    public string? Email { get; private set; }

    public string? FirstName { get; private set; }
    
    public string? LastName { get; private set; }
    
    public string? KeycloakUserId { get; private set; }

    public ICollection<UserRole>? UserRoles { get; }

    #endregion

    #region Methods

    public static User Create(Guid id, 
        string userName, 
        string email,
        string firstName,
        string lastName,
        string password,
        string modifiedBy,
        string? keycloakUserId = null)
    {
        var user = new User
        {
            Id = id,
            UserName = userName,
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            KeycloakUserId = keycloakUserId,
            CreatedBy = modifiedBy,
            LastModifiedBy = modifiedBy,
        };

        user.AddDomainEvent(new UserCreatedDomainEvent(user, password));

        return user;
    }

    #endregion
}
