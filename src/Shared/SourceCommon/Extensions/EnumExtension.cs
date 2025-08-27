#region using

using System.ComponentModel;
using System.Reflection;

#endregion

namespace SourceCommon.Extensions;

public static class EnumExtension
{
    #region methods

    public static string GetDescription<TEnum>(this TEnum? value) where TEnum : struct, Enum
    {
        if (!value.HasValue)
            return string.Empty;

        var field = typeof(TEnum).GetField(value.ToString()!);
        if (field == null)
            return value.ToString() ?? string.Empty;

        var attribute = field.GetCustomAttribute<DescriptionAttribute>();
        return attribute?.Description ?? value.ToString() ?? string.Empty;
    }

    #endregion

}
