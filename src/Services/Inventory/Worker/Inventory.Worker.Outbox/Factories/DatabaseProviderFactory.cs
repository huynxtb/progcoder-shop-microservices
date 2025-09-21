#region using

using Common.Constants;
using Inventory.Worker.Outbox.Abstractions;
using Inventory.Worker.Outbox.Providers;

#endregion

namespace Inventory.Worker.Outbox.Factories;

public static class DatabaseProviderFactory
{
    #region Methods

    public static IDatabaseProvider CreateProvider(string dbType)
    {
        return dbType.ToUpperInvariant() switch
        {
            DatabaseType.MySql => new MySqlDatabaseProvider(),
            DatabaseType.PostgreSql => new PostgreSqlDatabaseProvider(),
            DatabaseType.SqlServer => new SqlServerDatabaseProvider(),
            _ => throw new NotSupportedException($"Unsupported database type: {dbType}. Supported types: {DatabaseType.MySql}, {DatabaseType.PostgreSql}, {DatabaseType.SqlServer}")
        };
    }

    #endregion
}
