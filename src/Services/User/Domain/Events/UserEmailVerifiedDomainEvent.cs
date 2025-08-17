namespace User.Domain.Events;

public sealed record class UserEmailVerifiedDomainEvent(Entities.User User);