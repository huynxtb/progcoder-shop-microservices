#region using

using MongoDB.Driver;

#endregion

namespace Discount.Infrastructure.Repositories;

/// <summary>
/// Provides MongoDB session for transaction support.
/// </summary>
internal interface IMongoSessionProvider
{
    /// <summary>
    /// Gets the current MongoDB session if a transaction is active, otherwise returns null.
    /// </summary>
    IClientSessionHandle? GetSession();
}

