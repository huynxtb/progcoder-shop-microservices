#region using

using System.Reflection;

#endregion

namespace EventSourcing.Events;

public static class AssemblyReference
{
    public static readonly Assembly Assembly = typeof(AssemblyReference).Assembly;
}
