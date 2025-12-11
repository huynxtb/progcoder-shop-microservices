#region using

using Marten;

#endregion

namespace Catalog.Application.Services;

public interface ISeedDataService
{
    #region Methods

    Task<bool> SeedDataAsync(IDocumentSession session, CancellationToken cancellationToken);

    #endregion
}

