namespace Notification.Application.Providers;

public interface ITemplateProvider
{
    #region Methods

    string Render(string template, IDictionary<string, object> data = default!);

    #endregion
}
