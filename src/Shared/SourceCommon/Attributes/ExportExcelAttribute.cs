namespace SourceCommon.Attributes;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public class ExportExcelAttribute : Attribute
{
    #region Fields, Properties and Indexers

    /// <summary>
    /// Custom column header text to display in the Excel export
    /// </summary>
    /// <remarks>
    /// When specified, this value will be used instead of the property name as the column header. Leave null to use the property name
    /// </remarks>
    public string? HeaderName { get; set; }

    /// <summary>
    /// Maps specific property values to cell colors in Excel export
    /// </summary>
    /// <remarks>
    /// Provide a JSON object where:
    /// - Keys: possible string values of the property
    /// - Values: colors to apply (HTML color names or hex codes)
    /// 
    /// Example:
    /// {
    ///   "Low": "yellow",
    ///   "Medium": "blue", 
    ///   "High": "red"
    /// }
    /// 
    /// Colors can be standard HTML names or hex codes (#RRGGBB)
    /// Find color codes at: https://htmlcolorcodes.com/color-picker/
    /// </remarks>
    public string? ValueColorMap { get; set; }

    /// <summary>
    /// Maps numeric ranges to cell colors in Excel export
    /// </summary>
    /// <remarks>
    /// Provide a JSON object where:
    /// - Keys: numeric ranges as "min-max" 
    /// - Values: colors to apply (HTML color names or hex codes)
    /// 
    /// Special range keywords:
    /// - "min": represents smallest possible decimal
    /// - "max": represents largest possible decimal
    /// 
    /// Example:
    /// {
    ///   "min-0": "red",     // Negative numbers in red
    ///   "0-100": "yellow",  // 0-100 in yellow
    ///   "1000-max": "green" // 1000+ in green
    /// }
    /// 
    /// Colors can be standard HTML names or hex codes (#RRGGBB)
    /// Find color codes at: https://htmlcolorcodes.com/color-picker/
    /// </remarks>
    public string? NumericRangeColorMap { get; set; }

    /// <summary>
    /// Summary functions to apply to this column in Excel export
    /// </summary>
    /// <remarks>
    /// Provide a JSON array of function configurations where each object contains:
    /// - 'Function': Excel function name (SUM, AVERAGE, MAX, MIN, COUNT, etc.)
    /// - 'Label': Display text for the summary row
    /// - 'Format': Excel format string for the summary result
    /// 
    /// Example:
    /// [
    ///     { 'Function': 'SUM', 'Label': 'Total", "Format': '#,##0.00' },
    ///     { 'Function': 'AVERAGE', 'Label': 'Average', 'Format': '#,##0.00' },
    ///     { 'Function': 'MAX', 'Label': 'Highest', 'Format': '#,##0.00' },
    ///     { 'Function': 'MIN', 'Label': 'Min", 'Format': '#,##0.00' }
    /// ]
    /// </remarks>
    public string? SummaryFunctions { get; set; }

    /// <summary>
    /// Excel format string to apply to cells in this column
    /// </summary>
    /// <remarks>
    /// Common format strings:
    /// - Numbers: "#,##0", "#,##0.00"
    /// - Currency: "$#,##0.00", "€#,##0.00"
    /// - Percentage: "0.00%", "0%"
    /// - Dates: "dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd", "dd-MMM-yyyy"
    /// - Date/Time: "dd/MM/yyyy HH:mm", "yyyy-MM-dd HH:mm:ss"
    /// - Text: "@" (forces text formatting)
    /// - Scientific: "0.00E+00"
    /// - Special: "[Red]#,##0.00;[Blue]-#,##0.00" (conditional formatting)
    /// 
    /// For more information on Excel format strings, see:
    /// https://support.microsoft.com/en-us/office/number-format-codes-5026bbd6-04bc-48cd-bf33-80f18b4eae68
    /// </remarks>
    public string? Format { get; set; }

    /// <summary>
    /// Maps boolean values to custom display text in Excel export
    /// </summary>
    /// <remarks>
    /// Provide a JSON object where:
    /// - Keys: 'True' and 'False' (case-insensitive)
    /// - Values: Display text to use for each boolean state
    /// 
    /// Example:
    /// {
    ///   'True': 'Active',
    ///   'False': 'Inactive'
    /// }
    /// or
    /// {
    ///   'True': 'Yes',
    ///   'False': 'No'
    /// }
    /// 
    /// If not specified, defaults to "Yes" for True and "No" for False
    /// </remarks>
    public string? BooleanValueMap { get; set; }

    /// <summary>
    /// If true, locks this entire column in the Excel sheet to prevent editing
    /// </summary>
    public bool IsLockColumn { get; set; } = false;

    #endregion
}