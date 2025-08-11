#region using

using Application.CQRS.User.Commands;
using Application.Services;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SourceCommon.Constants;

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
        
        await writeDbContext.Database.MigrateAsync();
        await readDbContext.Database.MigrateAsync();

        await SeedDataAsync(writeDbContext, readDbContext);
    }

    private static async Task SeedDataAsync(WriteDbContext writeDbContext, ReadDbContext readDbContext)
    {
        // TODO
        await Task.CompletedTask;
    }

    #endregion
}
