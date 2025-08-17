#region using

using User.Domain.Abstractions;
using User.Domain.Events;

#endregion

namespace User.Domain.Entities;

public sealed class User : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string? UserName { get; private set; }

    public string? Email { get; private set; }

    public string? FirstName { get; private set; }
    
    public string? LastName { get; private set; }

    public bool EmailVerified { get; private set; }

    public bool IsActive { get; private set; }

    public ICollection<LoginHistory> LoginHistories { get; } = [];

    #endregion

    #region Methods

    public static User Create(Guid id, 
        string userName, 
        string email,
        string firstName,
        string lastName,
        bool emailVerified,
        bool isActive,
        string modifiedBy)
    {
        var user =  new User
        {
            Id = id,
            UserName = userName,
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            EmailVerified = emailVerified,
            IsActive = isActive,
            CreatedBy = modifiedBy,
            LastModifiedBy = modifiedBy,
        };

        user.AddDomainEvent(new UserCreatedDomainEvent(user));

        return user;
    }

    public void Update(string userName, 
        string email, 
        string firstName, 
        string lastName,
        bool emailVerified,
        bool isActive,
        string modifiedBy)
    {
        UserName = userName;
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        EmailVerified = emailVerified;
        IsActive = isActive;
        LastModifiedBy = modifiedBy;

        this.AddDomainEvent(new UserUpdatedDomainEvent(this));
    }

    public void VerifyEmail(bool emailVerified)
    {
        EmailVerified = emailVerified;
    }

    public void Delete()
    {
        this.AddDomainEvent(new UserDeletedDomainEvent(this));
    }

    #endregion
}
