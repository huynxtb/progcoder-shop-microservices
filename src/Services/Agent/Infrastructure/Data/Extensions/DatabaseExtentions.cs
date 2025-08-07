#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

#endregion

namespace Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var writeDbContext = scope.ServiceProvider.GetRequiredService<WriteDbContext>();
        var readDbContext = scope.ServiceProvider.GetRequiredService<ReadDbContext>();

        //await writeDbContext.Database.EnsureDeletedAsync();
        await writeDbContext.Database.MigrateAsync();

        //await readDbContext.Database.EnsureDeletedAsync();
        await readDbContext.Database.MigrateAsync();

        await SeedAsync(writeDbContext);
    }

    private static async Task SeedAsync(WriteDbContext context)
    {
        await SeedDataAsync(context);
    }

    private static async Task SeedDataAsync(WriteDbContext context)
    {
        // TODO
        await Task.CompletedTask;
    }

    #endregion
}
