#region using

using AutoMapper;
using Notification.Application.Dtos.Keycloaks;
using Notification.Application.Dtos.Notifications;
using Notification.Domain.Entities;
using Notification.Domain.Models.Externals.Keycloaks;

#endregion

namespace Notification.Application.Mappings;

public sealed class NotificationMappingProfile : Profile
{
    #region Ctors

    public NotificationMappingProfile()
    {
        CreateMap<NotificationEntity, NotificationDto>();
        CreateMap<KeycloakUser, KeycloakUserDto>();
        CreateMap<KeycloakAccessTokenResponse, KeycloakAccessTokenDto>();
    }

    #endregion
}

