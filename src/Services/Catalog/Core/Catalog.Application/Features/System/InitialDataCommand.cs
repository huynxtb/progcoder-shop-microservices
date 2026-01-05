#region using

using Catalog.Application.Services;
using Marten;

#endregion

namespace Catalog.Application.Features.System;

public sealed record InitialDataCommand(Actor Actor) : ICommand<bool>;

public sealed class InitialDataCommandHandler(
    IDocumentSession session,
    ISeedDataService seedDataService) : ICommandHandler<InitialDataCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(InitialDataCommand command, CancellationToken cancellationToken)
    {
        var result = await seedDataService.SeedDataAsync(session, cancellationToken);
        return result;
    }

    #endregion
}
