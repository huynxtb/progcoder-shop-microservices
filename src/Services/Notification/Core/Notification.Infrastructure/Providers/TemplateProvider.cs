#region using

using Notification.Application.Providers;
using System.Text.RegularExpressions;

#endregion

namespace Notification.Infrastructure.Providers;

public sealed class TemplateProvider : ITemplateProvider
{
    #region Fields, Properties and Indexers

    private static readonly Regex Pattern = new(@"#(\w+)#", RegexOptions.Compiled);

    #endregion

    #region Implementations

    public string Render(string template, IDictionary<string, object> data = default!)
    {
        if(data == null) return template;

        return Pattern.Replace(template, m =>
        {
            var key = m.Groups[1].Value;
            return data.TryGetValue(key, out var val) && val is not null
            ? val.ToString()!
            : string.Empty;
        });
    }

    #endregion
}
