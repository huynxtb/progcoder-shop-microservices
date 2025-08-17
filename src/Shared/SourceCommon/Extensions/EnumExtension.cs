#region using

using System.ComponentModel;
using System.Reflection;

#endregion

namespace SourceCommon.Extensions;

public static class EnumExtension
{
    #region methods

    public static string ReadDescription<T>(this T enumChild)
    {
        Type type = typeof(T);
        FieldInfo? fieldInfo = type.GetField(enumChild?.ToString() ?? string.Empty);

        if (fieldInfo is null) return type.Name;

        DescriptionAttribute[] attr = (DescriptionAttribute[])
            fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

        return attr[0].Description;
    }

    #endregion

}
