#region using

using Inventory.Domain.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

#endregion

namespace Inventory.Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await SeedDataAsync(dbContext);
    }

    private static async Task SeedDataAsync(ApplicationDbContext dbContext)
    {
        await Task.CompletedTask;
    }

    #endregion
}
