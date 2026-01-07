#region using

using FluentValidation;
using System.Text.RegularExpressions;

#endregion

namespace BuildingBlocks.Validators;

public static class CustomValidators
{
    #region Methods

    public static IRuleBuilderOptions<T, IList<TElement>> MustHave<T, TElement>(this IRuleBuilder<T, IList<TElement>> ruleBuilder, int num)
    {
        return ruleBuilder.NotNull();
    }

    /// <summary>
    /// Validates that the phone number is in a valid format.
    /// Supports international formats like +1234567890, (123) 456-7890, 123-456-7890, 123.456.7890, 123 456 7890, etc.
    /// </summary>
    /// <typeparam name="T">The type being validated</typeparam>
    /// <param name="ruleBuilder">The rule builder</param>
    /// <returns>Rule builder options</returns>
    public static IRuleBuilderOptions<T, string> IsValidPhoneNumber<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder.Must(BeAValidPhoneNumber).WithMessage("Invalid phone number format");
    }

    /// <summary>
    /// Validates that the phone number is in a valid format with custom error message.
    /// </summary>
    /// <typeparam name="T">The type being validated</typeparam>
    /// <param name="ruleBuilder">The rule builder</param>
    /// <param name="errorMessage">Custom error message</param>
    /// <returns>Rule builder options</returns>
    public static IRuleBuilderOptions<T, string> IsValidPhoneNumber<T>(this IRuleBuilder<T, string> ruleBuilder, string errorMessage)
    {
        return ruleBuilder.Must(BeAValidPhoneNumber).WithMessage(errorMessage);
    }

    private static bool BeAValidPhoneNumber(string? phoneNumber)
    {
        if (string.IsNullOrWhiteSpace(phoneNumber))
            return false;

        // Remove all whitespace and common separators for validation
        var cleanNumber = Regex.Replace(phoneNumber, @"[\s\-\(\)\.]+", "");

        // Check for international format starting with +
        if (cleanNumber.StartsWith("+"))
        {
            cleanNumber = cleanNumber.Substring(1);
        }

        // Phone number should contain only digits after cleaning
        if (!Regex.IsMatch(cleanNumber, @"^\d+$"))
            return false;

        // Phone number should be between 7 and 15 digits (international standard)
        if (cleanNumber.Length < 7 || cleanNumber.Length > 15)
            return false;

        // Additional validation: Common phone number patterns
        var phonePatterns = new[]
        {
            @"^\+?[1-9]\d{6,14}$",                          // International format: +1234567890 (7-15 digits)
            @"^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$", // US format variations
            @"^\+?[0-9]{2,4}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}$", // International variations
            @"^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$" // Standard US format without country code
        };

        return phonePatterns.Any(pattern => Regex.IsMatch(phoneNumber, pattern));
    }

    #endregion
}