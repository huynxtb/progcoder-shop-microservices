namespace Basket.Domain.Attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
public class BsonCollectionAttribute : Attribute
{
    #region Fields, Properties and Indexers

    public string CollectionName { get; }

    #endregion

    #region Ctors

    public BsonCollectionAttribute(string collectionName)
    {
        CollectionName = collectionName;
    }

    #endregion
}
