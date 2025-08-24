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
        string createdBy = SystemConst.CreatedBySystem)
    {
        var user =  new UserEntity
        {
            Id = id,
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

        var @event = new UserCreatedDomainEvent(id, userName, firstName, lastName, phoneNumber, email, password);

        user.AddDomainEvent(@event);

        return user;
    }

    public void Update(string email, 
        string firstName, 
        string lastName,
        string phoneNumber,
        bool emailVerified,
        bool isActive,
        string modifiedBy = SystemConst.CreatedBySystem)
    {
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        EmailVerified = emailVerified;
        IsActive = isActive;
        LastModifiedBy = modifiedBy;

        AddDomainEvent(new UserUpdatedDomainEvent(Id, Email!, FirstName!, LastName!, PhoneNumber, IsActive));
    }

    public void Update(string email,
        string firstName,
        string lastName,
        string phoneNumber,
        string modifiedBy = SystemConst.CreatedBySystem)
    {
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        LastModifiedBy = modifiedBy;

        AddDomainEvent(new UserUpdatedDomainEvent(Id, Email!, FirstName!, LastName!, PhoneNumber, IsActive));
    }

    public void ChangeStatus(bool isActive, string modifiedBy = SystemConst.CreatedBySystem)
    {
        IsActive = isActive;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        LastModifiedBy = modifiedBy;

        AddDomainEvent(new UserUpdatedDomainEvent(Id, Email!, FirstName!, LastName!, PhoneNumber, IsActive));
    }

    public void VerifyEmail(bool emailVerified)
    {
        EmailVerified = emailVerified;
    }

    public void Delete()
    {
        AddDomainEvent(new UserDeletedDomainEvent(Id));
    }

    #endregion
}
