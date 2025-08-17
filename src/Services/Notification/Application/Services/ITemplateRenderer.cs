namespace Notification.Application.Services;

public interface ITemplateRenderer
{
    #region Methods

    string Render(string template, IDictionary<string, object> data = default!);

    #endregion
}
