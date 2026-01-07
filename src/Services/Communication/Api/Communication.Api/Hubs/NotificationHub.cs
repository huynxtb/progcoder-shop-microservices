#region using

using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

#endregion

namespace Communication.Api.Hubs;

public sealed class NotificationHub : Hub
{
    #region Fields, Properties and Indexers

    private const string UserGroupPrefix = "user_";

    #endregion

    #region Methods

    public override async Task OnConnectedAsync()
    {
        var userId = GetUserId();
        if (!string.IsNullOrEmpty(userId))
        {
            var groupName = GetUserGroupName(userId);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = GetUserId();
        if (!string.IsNullOrEmpty(userId))
        {
            var groupName = GetUserGroupName(userId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        await base.OnDisconnectedAsync(exception);
    }

    public async Task JoinGroup(string userId)
    {
        if (string.IsNullOrEmpty(userId))
            return;

        var groupName = GetUserGroupName(userId);
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task LeaveGroup(string userId)
    {
        if (string.IsNullOrEmpty(userId))
            return;

        var groupName = GetUserGroupName(userId);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }

    #endregion

    #region Private Methods

    private string? GetUserId()
    {
        return Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }

    private static string GetUserGroupName(string userId)
    {
        return $"{UserGroupPrefix}{userId}";
    }

    #endregion
}
