#region using
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using User.Domain.Abstractions;
using User.Infrastructure.Data.Collectors;
#endregion

namespace User.Infrastructure.Data.Interceptors;

public sealed class DispatchDomainEventsInterceptor(
    IDomainEventsCollector collector,
    IMediator mediator) : SaveChangesInterceptor
{
    // ---- 1) SNAPSHOT TRƯỚC KHI EF GHI DB ----
    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData,
        InterceptionResult<int> result)
    {
        Snapshot(eventData.Context);
        return result;
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        Snapshot(eventData.Context);
        return ValueTask.FromResult(result);
    }

    // ---- 2) PUBLISH SAU KHI COMMIT THÀNH CÔNG ----
    public override int SavedChanges(SaveChangesCompletedEventData eventData, int result)
    {
        PublishFromCollectorAsync(cancellationToken: default).GetAwaiter().GetResult();
        return result;
    }

    public override async ValueTask<int> SavedChangesAsync(
        SaveChangesCompletedEventData eventData, int result,
        CancellationToken cancellationToken = default)
    {
        await PublishFromCollectorAsync(cancellationToken);
        return result;
    }

    // ---- 3) NẾU COMMIT FAIL → KHÔNG PUBLISH, XÓA BỘ ĐỆM ----
    public override void SaveChangesFailed(DbContextErrorEventData eventData)
    {
        collector.Drain(); // bỏ mọi events đã snapshot
        base.SaveChangesFailed(eventData);
    }

    // ====================== helpers ======================

    private void Snapshot(DbContext? ctx)
    {
        if (ctx is null) return;

        // Lấy tất cả aggregates có DomainEvents
        var events = ctx.ChangeTracker.Entries<IAggregate>()
            .Where(e => e.Entity.DomainEvents.Any())
            .SelectMany(e =>
            {
                // chụp & clear để tránh duplicate khi EF re-save
                var list = e.Entity.DomainEvents.ToList();
                e.Entity.ClearDomainEvents();
                return list;
            })
            .ToList();

        if (events.Count > 0)
            collector.AddRange(events);
    }

    private async Task PublishFromCollectorAsync(CancellationToken cancellationToken)
    {
        // LẤY TỪ COLLECTOR – KHÔNG QUÉT CHANGETRACKER NỮA
        var events = collector.Drain();
        if (events.Count == 0) return;

        foreach (var @event in events)
            await mediator.Publish(@event, cancellationToken);
    }
}
