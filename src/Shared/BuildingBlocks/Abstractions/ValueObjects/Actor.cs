namespace BuildingBlocks.Abstractions.ValueObjects;

public enum ActorKind { User, System, Job, Worker, Consumer }

public readonly record struct Actor(ActorKind Kind, string Value)
{
    #region Methods

    public static Actor User(string value)
        => new(ActorKind.User, value);

    public static Actor System(string value)
        => new(ActorKind.System, value);

    public static Actor Job(string value)
        => new(ActorKind.Job, value);

    public static Actor Worker(string value)
        => new(ActorKind.Worker, value);

    public static Actor Consumer(string value)
        => new(ActorKind.Consumer, value);

    public override string ToString()
    {
        if (Kind == ActorKind.User) return Value!;

        return $"{Kind.ToString().ToLowerInvariant()}:{Value}";
    }

    #endregion
}