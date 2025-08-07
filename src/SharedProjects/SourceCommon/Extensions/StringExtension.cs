namespace SourceCommon.Extensions;

public static class StringExtension
{
    #region Fields, Properties and Indexers

    private static readonly string[] SpecialCharacters = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "}", "\\", ":", ";", "\"", "'", ",", "<", ".", ">", "/", "?"];

    private static readonly string[] VietnameseSigns = ["aAeEoOuUiIdDyY", "áàạảãâấầậẩẫăắằặẳẵ", "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ", "éèẹẻẽêếềệểễ", "ÉÈẸẺẼÊẾỀỆỂỄ", "óòọỏõôốồộổỗơớờợởỡ", "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ", "úùụủũưứừựửữ", "ÚÙỤỦŨƯỨỪỰỬỮ", "íìịỉĩ", "ÍÌỊỈĨ", "đ", "Đ", "ýỳỵỷỹ", "ÝỲỴỶỸ"];

    #endregion

    #region Methods

    public static string ToURLCode(this string value)
    {
        value = SpecialCharacters.Aggregate(value, (current, item) => current.Replace(item, string.Empty));

        for (int i = 1; i < VietnameseSigns.Length; i++)
        {
            for (int j = 0; j < VietnameseSigns[i].Length; j++)
            {
                value = value.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }
        }

        return value.ToLower().Replace(' ', '-'); ;
    }

    public static string ToUniqueURLCode(this string value)
    {
        return $"{ToURLCode(value)}-{Guid.NewGuid().ToString().Split("-").First()}";
    }

    public static string ToUniqueCodeWithPrefix(this string prefix)
    {
        return $"{prefix}.{Guid.NewGuid().ToString().Split("-").First().ToUpper()}";
    }

    public static string TruncateString(this string value, int maxLength = 0)
    {
        return value.Length > maxLength
        ? string.Concat(value.AsSpan(0, maxLength), "...")
        : value;
    }

    public static bool IsEmpty(this string value)
    {
        if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
        {
            return true;
        }

        return false;
    }

    #endregion
}
