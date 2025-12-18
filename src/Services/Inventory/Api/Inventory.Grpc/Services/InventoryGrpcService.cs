#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using Grpc.Core;
using Inventory.Application.CQRS.InventoryReservation.Commands;
using MediatR;

#endregion

namespace Inventory.Grpc.Services;

public sealed class InventoryGrpcService(
    ISender sender,
    ILogger<InventoryGrpcService> logger) : InventoryGrpc.InventoryGrpcBase
{
    #region Methods

    public override async Task<ExpireReservationResponse> ExpireReservation(
        ExpireReservationRequest request, 
        ServerCallContext context)
    {
        logger.LogInformation("gRPC ExpireReservation called");

        try
        {
            var command = new ExpireReservationCommand(Actor.System(AppConstants.Service.Inventory));
            await sender.Send(command, context.CancellationToken);

            logger.LogInformation("Successfully expired reservations");

            return new ExpireReservationResponse
            {
                Success = "Expired reservations successfully"
            };
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to expire reservations");
            throw new RpcException(new Status(StatusCode.Internal, $"Failed to expire reservations: {ex.Message}"));
        }
    }

    #endregion
}
