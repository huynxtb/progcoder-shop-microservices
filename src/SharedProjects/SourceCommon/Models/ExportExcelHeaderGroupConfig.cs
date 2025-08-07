#region using

using System.Drawing;

#endregion

namespace SourceCommon.Models;

public class ExportExcelHeaderGroupConfig
{
    #region Fields, Properties and Indexers

    /// <summary>
    /// Title text to display in the header group
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Number of columns this header spans
    /// </summary>
    public int ColumnSpan { get; set; } = 1;

    /// <summary>
    /// Background color for the header (HTML color or hex code)
    /// </summary>
    public string BackgroundColorHtml { get; set; } = "#4472C4";

    /// <summary>
    /// Text color for the header (HTML color or hex code)
    /// </summary>
    public string ForegroundColorHtml { get; set; } = "#FFFFFF";

    /// <summary>
    /// Whether to make the text bold
    /// </summary>
    public bool Bold { get; set; } = true;

    /// <summary>
    /// Background color as Color object (converted from HTML color)
    /// </summary>
    public Color BackgroundColor => ColorTranslator.FromHtml(BackgroundColorHtml);

    /// <summary>
    /// Foreground color as Color object (converted from HTML color)
    /// </summary>
    public Color ForegroundColor => ColorTranslator.FromHtml(ForegroundColorHtml);

    #endregion
}
