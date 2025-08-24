#region using

using Marten;
using Marten.Schema;

#endregion

namespace Catalog.Infrastructure.Data;

public sealed class InitialData : IInitialData
{
    public async Task Populate(IDocumentStore store, CancellationToken cancellation)
    {
        //using var session = store.LightweightSession();

        //session.Store<AttributeSet>(JsonConvert.DeserializeObject<List<AttributeSet>>(attrs) ?? []);

        //await session.SaveChangesAsync();
    }
}
