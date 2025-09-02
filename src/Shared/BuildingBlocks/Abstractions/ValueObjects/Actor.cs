using System.Xml.Linq;

namespace BuildingBlocks.Abstractions.ValueObjects;

public enum ActorKind { User, System, Job, Worker }

public readonly record struct Actor(ActorKind Kind, string? Key = null)
{
    #region Methods

    public static Actor User(string value)
        => new(ActorKind.User, value);

    public static Actor System(string name)
        => new(ActorKind.System, Slug(name));

    public static Actor Job(string name)
        => new(ActorKind.Job, Slug(name));

    public static Actor Worker(string name)
        => new(ActorKind.Worker, Slug(name));

    public override string ToString()
    {
        if (Kind == ActorKind.User) return Key!;

        return Key is null
           ? $"{Kind.ToString().ToLowerInvariant()}"
           : $"{Kind.ToString().ToLowerInvariant()}:{Key}";
    }

    private static string Slug(string s) =>
        string.Join('-', s.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries)).ToLowerInvariant();

    #endregion
}