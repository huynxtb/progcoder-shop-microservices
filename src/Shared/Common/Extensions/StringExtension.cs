#region using

using System.Text.RegularExpressions;

#endregion

namespace Common.Extensions;

public static class StringExtension
{
    #region Methods

    public static string TruncateString(this string value, int maxLength = 0)
    {
        return value.Length > maxLength
        ? string.Concat(value.AsSpan(0, maxLength), "...")
        : value;
    }

    public static string Slugify(this string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;

        string result = Regex.Replace(input, @"\s+", "-");
        result = Regex.Replace(result, @"[^a-zA-Z0-9\-]", "");
        result = Regex.Replace(result, "-{2,}", "-");

        return result.Trim('-');
    }

    public static TEnum? ToEnum<TEnum>(this string str) where TEnum : struct, Enum
    {
        if (string.IsNullOrWhiteSpace(str))
            return null;

        return Enum.TryParse<TEnum>(str, true, out var result) ? result : null;
    }

    public static string To(this string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;

        string result = Regex.Replace(input, @"\s+", "-");
        result = Regex.Replace(result, @"[^a-zA-Z0-9\-]", "");
        result = Regex.Replace(result, "-{2,}", "-");

        return result.Trim('-');
    }

    #endregion
}
