#region using

using SourceCommon.Attributes;
using System.Reflection;

#endregion

namespace SourceCommon.Models;

public class ExportExcelPropertyInfoConfig
{
    #region Fields, Properties and Indexers

    public PropertyInfo? Property { get; set; }

    public ExportExcelAttribute? ExportAttr { get; set; }

    #endregion
}
