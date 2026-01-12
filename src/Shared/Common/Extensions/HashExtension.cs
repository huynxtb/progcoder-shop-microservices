#region using

using System.Security.Cryptography;
using System.Text;

#endregion

namespace Common.Extensions;

public static class HashExtension
{
    #region Methods

    public static string UseSha256(this string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;

        using (var sha = SHA256.Create())
        {
            var bytes = Encoding.UTF8.GetBytes(input);
            var hash = sha.ComputeHash(bytes);

            return Convert.ToBase64String(hash);
        }
    }

    public static byte[]? UseSha256(this byte[] input)
    {
        if (input == null)
        {
            return null;
        }

        using (var sha = SHA256.Create())
        {
            return sha.ComputeHash(input);
        }
    }

    public static string UseSha512(this string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;

        using (var sha = SHA512.Create())
        {
            var bytes = Encoding.UTF8.GetBytes(input);
            var hash = sha.ComputeHash(bytes);

            return Convert.ToBase64String(hash);
        }
    }

    #endregion
}