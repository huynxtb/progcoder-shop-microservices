#region using

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

#endregion

namespace Discount.Domain.Abstractions;

public abstract class EntityId<T> : IEntityId<T>
{
    #region Fields, Properties and Indexers

    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public T Id { get; set; } = default!;

    #endregion

}

