#region using

using Common.ValueObjects;
using Common.Constants;
using Inventory.Domain.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
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
        if (await dbContext.Locations.AnyAsync())
        {
            return;
        }

        var performBy = Actor.System(AppConstants.Service.Inventory).ToString();
        var location1 = LocationEntity.Create(Guid.Parse("a2d8c5a8-2a64-4b6d-a1c0-0c8b4b9c1a11"),
            "Hà Nội",
            performBy);
        var location2 = LocationEntity.Create(Guid.Parse("a2d8c5a8-2a64-4b6d-a1c0-0c8b4b9c1a12"),
            "Đà Nẵng",
            performBy);
        var location3 = LocationEntity.Create(Guid.Parse("a2d8c5a8-2a64-4b6d-a1c0-0c8b4b9c1a13"),
            "Hồ Chí Minh",
            performBy);

        await dbContext.Locations.AddRangeAsync(location1, location2, location3);
        await dbContext.SaveChangesAsync();
    }

    #endregion
}
