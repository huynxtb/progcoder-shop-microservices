namespace Common.Extensions;

public static class NumericExtension
{
    #region Fields, Properties and Indexers

    private static readonly string[] FileSizeSuffixes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

    #endregion

    #region Methods

    public static string ToFileSize(this long value)
    {
        int counter = 0;
        decimal number = value;
        while (Math.Round(number / 1024) >= 1)
        {
            number /= 1024;
            counter++;
        }

        return $"{number:n1} {FileSizeSuffixes[counter]}";
    }

    public static string ToShortNumber(this int value)
    {
        const string baseString = "k";
        string toString = $"{value:#,##0.##}";
        if (value < 1000)
        {
            return value.ToString();
        }

        string s1 = toString.Split(",")[0];
        string s2 = toString.Split(",")[1];

        string str;
        if (int.Parse(s2) > 99)
        {
            str = string.Concat(s1, ".", s2.AsSpan(0, s2.Length - 2), baseString);
        }
        else
        {
            str = s1 + baseString;
        }

        return str;
    }

    public static TEnum? ToEnum<TEnum>(this int value) where TEnum : struct, Enum
    {
        return Enum.IsDefined(typeof(TEnum), value)
            ? (TEnum)Enum.ToObject(typeof(TEnum), value)
            : null;
    }

    #endregion
}
