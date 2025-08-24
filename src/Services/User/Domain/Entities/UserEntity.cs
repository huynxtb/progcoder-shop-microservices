#region using

using SourceCommon.Constants;
using User.Domain.Abstractions;
using User.Domain.Events;
using static Microsoft.IO.RecyclableMemoryStreamManager;

#endregion

namespace User.Domain.Entities;

public sealed class UserEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string? KeycloakUserNo { get; private set; }

    public string? UserName { get; private set; }

    public string? Email { get; private set; }

    public string? FirstName { get; private set; }
    
    public string? LastName { get; private set; }

    public string? PhoneNumber { get; private set; }

    public bool EmailVerified { get; private set; }

    public bool IsActive { get; private set; }

    public ICollection<LoginHistoryEntity> LoginHistories { get; } = [];

    #endregion

    #region Ctors

    private UserEntity() { }

    #endregion

    #region Methods

    public static UserEntity Create(Guid id,
        string userName, 
        string email,
        string firstName,
        string lastName,
        string? password = null,
        string? phoneNumber = null,
        bool emailVerified = false,
        bool isActive = true,
        string? keycloakUserNo = null,
        string createdBy = SystemConst.CreatedBySystem)
    {
        var user =  new UserEntity
        {
            Id = id,
            KeycloakUserNo = keycloakUserNo,
            UserName = userName,
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            PhoneNumber = phoneNumber,
            EmailVerified = emailVerified,
            IsActive = isActive,
            CreatedBy = createdBy,
            LastModifiedBy = createdBy,
        };

        var @event = new UserCreatedDomainEvent(id, keycloakUserNo, userName, firstName, lastName, phoneNumber, email, password);
        
        if (createdBy != SystemConst.CreatedByKeycloak)
        {
            user.AddDomainEvent(@event);
        }
        
        return user;
    }

    public void Update(string keycloakUserNo,
        string email, 
        string firstName, 
        string lastName,
        string phoneNumber,
        bool emailVerified,
        bool isActive,
        string modifiedBy)
    {
        KeycloakUserNo = keycloakUserNo;
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        EmailVerified = emailVerified;
        IsActive = isActive;
        LastModifiedBy = modifiedBy;

        if (modifiedBy != SystemConst.CreatedByKeycloak)
        {
            AddDomainEvent(new UserUpdatedDomainEvent(Id, KeycloakUserNo, Email, FirstName, LastName, PhoneNumber, IsActive));
        }
    }

    public void Update(string email,
        string firstName,
        string lastName,
        string phoneNumber,
        string modifiedBy)
    {
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        LastModifiedBy = modifiedBy;

        if (modifiedBy != SystemConst.CreatedByKeycloak)
        {
            AddDomainEvent(new UserUpdatedDomainEvent(Id, KeycloakUserNo, Email, FirstName, LastName, PhoneNumber, IsActive));
        }
    }

    public void ChangeStatus(bool isActive, string modifiedBy)
    {
        IsActive = isActive;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        LastModifiedBy = modifiedBy;

        if (modifiedBy != SystemConst.CreatedByKeycloak)
        {
            AddDomainEvent(new UserUpdatedDomainEvent(Id, KeycloakUserNo, Email!, FirstName!, LastName!, PhoneNumber, IsActive));
        }
    }

    public void VerifyEmail(bool emailVerified)
    {
        EmailVerified = emailVerified;
    }

    public void Delete(string deletedBy)
    {
        if (deletedBy != SystemConst.CreatedByKeycloak)
        {
            AddDomainEvent(new UserDeletedDomainEvent(Id, KeycloakUserNo));
        }
    }

    #endregion
}
