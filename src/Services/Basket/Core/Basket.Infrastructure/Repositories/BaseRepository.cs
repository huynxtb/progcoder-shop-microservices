#region using

using Basket.Domain.Attributes;
using MongoDB.Driver;
using System.Reflection;

#endregion

namespace Basket.Infrastructure.Repositories;

public class BaseRepository<T>
{
    #region Fields, Properties and Indexers

    protected readonly IMongoCollection<T> _collection;

    #endregion

    #region Ctors

    public BaseRepository(IMongoDatabase db)
    {
        var attribute = typeof(T).GetCustomAttribute<BsonCollectionAttribute>();
        _collection = db.GetCollection<T>(attribute?.CollectionName ?? typeof(T).Name.ToLowerInvariant());
    }

    #endregion
}
