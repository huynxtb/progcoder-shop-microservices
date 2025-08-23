#region using

using Notification.Domain.Entities;
using Notification.Domain.Enums;

#endregion

namespace Notification.Application.Data.Repositories;

public interface IQueryTemplateRepository
{
    #region Methods

    Task<TemplateEntity> GetAsync(string key, ChannelType channel, CancellationToken cancellationToken = default);

    #endregion
}
