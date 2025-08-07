#region using

using SourceCommon.Attributes;
using SourceCommon.Models;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using System.Reflection;
using System.Text.Json;

#endregion

namespace SourceCommon.Helpers;

public static class ExportExcelHelper
{
    #region Fields, Properties and Indexers

    private static readonly Dictionary<Type, string> _defaultFormats = new()
    {
        { typeof(int), "#,##0" },
        { typeof(long), "#,##0" },
        { typeof(short), "#,##0" },
        { typeof(byte), "#,##0" },
        { typeof(decimal), "#,##0.00" },
        { typeof(double), "#,##0.00" },
        { typeof(float), "#,##0.00" },
        { typeof(Guid), "@" },
        { typeof(Uri), "@" },
        { typeof(DateOnly), "yyyy-MM-dd" },
        { typeof(TimeSpan), "HH:mm:ss" }
    };

    private static readonly HashSet<string> _currencyNameHints = new(StringComparer.OrdinalIgnoreCase)
    {
        "price", "cost", "amount", "total", "revenue", "budget",
        "payment", "salary", "income", "expense", "fee", "charge",
        "tax", "balance", "money", "currency", "paid", "fund"
    };

    #endregion

    #region Methods

    /// <summary>
    /// Export a collection to Excel file
    /// </summary>
    /// <param name="data">A collection to export</param>
    /// <param name="excelPackage">ExcelWorksheet</param>
    /// <param name="sheetName">Name of the worksheet</param>
    /// <param name="sheetTitle">Title text to display at the top of the worksheet</param>
    /// <param name="rowIndex">Start row index</param>
    /// <param name="colIndex">Start column index</param>
    /// <param name="wrapTextLength">Length for apply wrap text style</param>
    /// <param name="redundantCols">Names of columns exclude from export</param>
    /// <param name="applyFilter">Apply filters to columns</param>
    /// <param name="fontSizeTitle">Font size for the sheet title (default: 14)</param>
    /// <param name="fontSizeColumn">Font size for column headers (default: 11)</param>
    /// <param name="headerGroups">Dictionary of header groups organized by level (1 is top)</param>
    /// <returns>ExcelWorksheet</returns>
    public static ExcelWorksheet ExportCollectionToWorksheet<T>(
        List<T>? data,
        ExcelPackage excelPackage,
        string sheetName = "Sheet1",
        string sheetTitle = "",
        int rowIndex = 0,
        int colIndex = 0,
        int wrapTextLength = 100,
        string[]? redundantCols = null,
        bool applyFilter = false,
        float fontSizeTitle = 14,
        float fontSizeColumn = 11,
        Dictionary<int, List<ExportExcelHeaderGroupConfig>>? headerGroups = null)
    {
        rowIndex = rowIndex < 0 ? 0 : rowIndex;
        colIndex = colIndex < 0 ? 0 : colIndex;
        wrapTextLength = wrapTextLength < 0 ? 50 : wrapTextLength;

        var worksheet = excelPackage.Workbook.Worksheets.FirstOrDefault(x => x.Name == sheetName)
            ?? excelPackage.Workbook.Worksheets.Add(sheetName);

        if (data == null || !data.Any()) return worksheet;

        // Get properties with ExportExcel attribute
        var properties = GetPropertiesInfo<T>(redundantCols);
        // Track columns wrap text for autofit
        var columnsWithWrapText = new HashSet<int>();

        var hasFormula = properties.Any(x => !string.IsNullOrEmpty(x.ExportAttr!.SummaryFunctions));

        if (hasFormula && colIndex == 0) colIndex = 1;
        if (!string.IsNullOrEmpty(sheetTitle) && rowIndex == 0) rowIndex = 2;

        int currentCol = colIndex;

        // Apply grouped headers if provided
        int headerRowsAdded = 0;
        if (headerGroups != null && headerGroups.Any())
        {
            headerRowsAdded = ApplyGroupHeaders(worksheet, headerGroups, rowIndex, colIndex);
            rowIndex += headerRowsAdded;
        }

        // Write headers
        foreach (var prop in properties)
        {
            string headerName = !string.IsNullOrEmpty(prop.ExportAttr!.HeaderName)
                ? prop.ExportAttr.HeaderName
                : prop.Property!.Name;

            var cell = worksheet.Cells[rowIndex + 1, currentCol + 1];

            cell.Value = headerName;

            using (var range = cell)
            {
                range.Style.Font.Bold = true;
                range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                range.Style.Fill.BackgroundColor.SetColor(Color.LightGray);
                range.Style.Border.BorderAround(ExcelBorderStyle.Thin);
            }

            currentCol++;
        }

        // Write data rows
        for (int i = 0; i < data.Count; i++)
        {
            currentCol = colIndex;
            var item = data[i];

            foreach (var prop in properties)
            {
                var value = prop.Property!.GetValue(item);
                var cell = worksheet.Cells[rowIndex + i + 2, currentCol + 1];

                cell.Value = value;

                // Apply wrap text style
                ApplyWrapTextStyle(worksheet, cell, value, wrapTextLength, currentCol, columnsWithWrapText);

                // Apply hyperlink for string values that are URLs
                ApplHyperlinkStyle(cell, value);

                // Check duplicate ValueColorMap and NumericRangeColorMap
                CheckDuplicateColorMapping(prop, value);

                // Apply color formatting based on ValueColorMap
                ApplyValueColorMap(cell, prop, value);

                // Apply color formatting based on NumericRangeColorMap
                ApplyNumericRangeColorMap(cell, prop, value);

                // Apply cell formatting based on the Format property and data type
                ApplyCustomFormatting(cell, prop, value);

                // Handle specific case of currency values by checking property name patterns
                AutoApplyFormatByPropertyNamePatterns(prop, value, cell);

                cell.Style.Font.Size = fontSizeColumn;
                cell.Style.Border.BorderAround(ExcelBorderStyle.Thin);

                currentCol++;
            }
        }

        // Apply summary functions
        ApplySummaryFunctions(worksheet, properties, data, rowIndex, colIndex);

        // Apply filters to columns
        if (applyFilter)
        {
            ApplyFilterToAllColumns(
                worksheet,
                colIndex,
                headerRow: rowIndex + 1,
                lastDataRow: rowIndex + 1 + data.Count,
                lastColumnIndex: colIndex + properties.Count
                );
        }

        AutoFitColumns(worksheet, columnsWithWrapText);

        if (!string.IsNullOrEmpty(sheetTitle))
        {
            AddTitleToWorksheet(worksheet, sheetTitle, fontSizeTitle);
        }

        int dataStartRow = rowIndex + 2;
        int dataEndRow = dataStartRow + data.Count - 1;

        for (int i = 0; i < properties.Count; i++)
        {
            bool isLock = properties[i].ExportAttr!.IsLockColumn;
            int excelCol = colIndex + i + 1;

            for (int row = dataStartRow; row <= dataEndRow; row++)
            {
                worksheet.Cells[row, excelCol].Style.Locked = isLock;
            }
        }

        worksheet.Protection.IsProtected = true;

        return worksheet;
    }

    #endregion

    #region Private Static Methods

    /// <summary>
    /// Applies grouped headers (multi-level headers) to an Excel worksheet
    /// </summary>
    /// <returns>The number of header rows added</returns>
    private static int ApplyGroupHeaders(
        ExcelWorksheet worksheet,
        Dictionary<int, List<ExportExcelHeaderGroupConfig>> headerGroups,
        int startRow = 0,
        int startCol = 0)
    {
        if (worksheet == null || headerGroups == null || !headerGroups.Any())
            return 0;

        int epplusRow = startRow + 1;
        int epplusCol = startCol + 1;
        int headerRowsAdded = 0;

        foreach (var level in headerGroups.Keys.OrderBy(k => k))
        {
            var groups = headerGroups[level];
            int currentCol = epplusCol;

            foreach (var group in groups)
            {
                int endCol = currentCol + group.ColumnSpan - 1;
                var range = worksheet.Cells[epplusRow, currentCol, epplusRow, endCol];

                range.Merge = true;
                range.Value = group.Title;

                range.Style.Font.Bold = group.Bold;
                range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                range.Style.Fill.BackgroundColor.SetColor(group.BackgroundColor);
                range.Style.Font.Color.SetColor(group.ForegroundColor);
                range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                range.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                range.Style.Border.BorderAround(ExcelBorderStyle.Thin);

                currentCol += group.ColumnSpan;
            }

            epplusRow++;
            headerRowsAdded++;
        }

        return headerRowsAdded;
    }

    private static void ApplySummaryFunctions<T>(
        ExcelWorksheet worksheet,
        List<ExportExcelPropertyInfoConfig> properties,
        List<T> data,
        int rowIndex,
        int colIndex)
    {
        var hasSummaryFunctions = properties.Any(x => !string.IsNullOrEmpty(x.ExportAttr!.SummaryFunctions));

        if (hasSummaryFunctions)
        {
            var propsWithSummary = properties
                .Select((prop, index) => new { Prop = prop, Index = index })
                .Where(x => !string.IsNullOrEmpty(x.Prop.ExportAttr!.SummaryFunctions))
                .ToList();

            // Dictionary to store property index -> list of function configs
            var summaryConfigs = new Dictionary<int, List<ExportExcelSummaryFunctionConfig>>();

            // Parse all summary function configurations
            foreach (var propInfo in propsWithSummary)
            {
                try
                {
                    var configs = JsonSerializer.Deserialize<List<ExportExcelSummaryFunctionConfig>>(
                        propInfo.Prop.ExportAttr!.SummaryFunctions!.Replace("'", "\""),
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                    );

                    if (configs != null && configs.Any())
                    {
                        summaryConfigs[propInfo.Index] = configs;
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error parsing SummaryFunctions for property '{propInfo.Prop.Property!.Name}': {ex.Message}");
                }
            }

            // Group all configs by function name to create one row per function type
            var functionGroups = summaryConfigs
                .SelectMany(pair => pair.Value.Select(config => new {
                    PropIndex = pair.Key,
                    Config = config
                }))
                .GroupBy(item => item.Config.Function)
                .ToList();

            // Start row for summary rows
            int startSummaryRow = rowIndex + data.Count + 2;

            // Create a row for each distinct function type
            int currentSummaryRow = startSummaryRow;
            foreach (var functionGroup in functionGroups)
            {
                string functionName = functionGroup.Key;

                // Determine label column (usually one to the left of first data column)
                int labelColumn = Math.Max(1, colIndex);

                // Set row label - use the label from the first config that has one
                var labelConfig = functionGroup.FirstOrDefault(item => !string.IsNullOrEmpty(item.Config.Label));
                string rowLabel = labelConfig != null && !string.IsNullOrEmpty(labelConfig.Config.Label)
                    ? labelConfig.Config.Label
                    : functionName;

                // Set the row label
                worksheet.Cells[currentSummaryRow, labelColumn].Value = rowLabel;
                worksheet.Cells[currentSummaryRow, labelColumn].Style.Font.Bold = true;
                worksheet.Cells[currentSummaryRow, labelColumn].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                // Apply formulas for this function to all applicable properties
                foreach (var item in functionGroup)
                {
                    var prop = properties[item.PropIndex];
                    int excelColIndex = colIndex + item.PropIndex + 1;

                    // Get property type
                    Type propType = prop.Property!.PropertyType;

                    // Check if numeric (except for COUNT and COUNTA)
                    bool isNumeric = propType == typeof(int) || propType == typeof(long) || propType == typeof(float) ||
                                    propType == typeof(double) || propType == typeof(decimal) ||
                                    propType == typeof(int?) || propType == typeof(long?) || propType == typeof(float?) ||
                                    propType == typeof(double?) || propType == typeof(decimal?);

                    if (!isNumeric &&
                        !(functionName.Equals("COUNT", StringComparison.OrdinalIgnoreCase) ||
                          functionName.Equals("COUNTA", StringComparison.OrdinalIgnoreCase)))
                    {
                        continue;
                    }

                    // Create formula
                    var cell = worksheet.Cells[currentSummaryRow, excelColIndex];

                    // Create range for formula
                    string startCell = GetExcelColumnName(excelColIndex) + (rowIndex + 2);
                    string endCell = GetExcelColumnName(excelColIndex) + (rowIndex + data.Count + 1);
                    string formulaRange = $"{startCell}:{endCell}";

                    // Apply formula
                    cell.Formula = $"{functionName}({formulaRange})";

                    // Apply formatting
                    if (!string.IsNullOrEmpty(item.Config.Format))
                    {
                        cell.Style.Numberformat.Format = item.Config.Format;
                    }
                    else
                    {
                        // Default formatting based on function and type
                        ApplyDefaultFormattingSummaryFunction(cell, functionName, propType);
                    }

                    // Apply styling
                    cell.Style.Font.Bold = true;
                    cell.Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    cell.Style.Fill.PatternType = ExcelFillStyle.Solid;

                    // Different background color for different summary rows
                    var backgroundColor = functionName.ToUpper() switch
                    {
                        "SUM" => Color.LightGray,
                        "AVERAGE" => Color.LightBlue,
                        "MIN" => Color.LightPink,
                        "MAX" => Color.LightGreen,
                        _ => Color.LightGray,
                    };
                    cell.Style.Fill.BackgroundColor.SetColor(backgroundColor);
                }

                currentSummaryRow++;
            }
        }
    }

    public static void ApplyCustomFormatting(
        ExcelRange cell,
        ExportExcelPropertyInfoConfig prop,
        object? value)
    {
        if (!string.IsNullOrEmpty(prop.ExportAttr!.Format))
        {
            cell.Style.Numberformat.Format = prop.ExportAttr.Format;
            return;
        }

        if (value == null) return;

        Type valueType = value.GetType();

        if (valueType.IsGenericType && valueType.GetGenericTypeDefinition() == typeof(Nullable<>))
        {
            valueType = Nullable.GetUnderlyingType(valueType)!;
        }

        if (valueType == typeof(DateTime))
        {
            FormatDateTime(cell, (DateTime)value);
            return;
        }

        if (valueType == typeof(DateTimeOffset))
        {
            FormatDateTimeOffset(cell, (DateTimeOffset)value);
            return;
        }

        if (valueType == typeof(bool))
        {
            cell.Style.Numberformat.Format = "@";

            bool boolValue = (bool)value;
            string stringValue = boolValue ? "True" : "False";

            if (string.IsNullOrEmpty(prop.ExportAttr.BooleanValueMap))
            {
                cell.Value = boolValue ? "Yes" : "No";
            }
            else
            {
                try
                {
                    var valueMap = JsonSerializer.Deserialize<Dictionary<string, string>>(
                        prop.ExportAttr.BooleanValueMap.Replace("'", "\""),
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    if (valueMap != null && valueMap.TryGetValue(stringValue, out string? mappedValue))
                    {
                        cell.Value = mappedValue;
                    }
                    else
                    {
                        cell.Value = boolValue ? "Yes" : "No";
                    }
                }
                catch
                {
                    cell.Value = boolValue ? "Yes" : "No";
                }
            }

            return;
        }

        if (IsNumericType(valueType) && MightBeCurrency(prop.Property!.Name))
        {
            cell.Style.Numberformat.Format = "$#,##0.00";
            return;
        }

        if (_defaultFormats.TryGetValue(valueType, out var format))
        {
            cell.Style.Numberformat.Format = format;
            return;
        }

        if ((valueType == typeof(decimal) || valueType == typeof(double) || valueType == typeof(float))
            && value.ToString()?.EndsWith("%") == true)
        {
            cell.Style.Numberformat.Format = "0.00%";
        }

    }

    private static void FormatDateTime(ExcelRange cell, DateTime dateTime)
    {
        bool hasTimeComponent = dateTime.TimeOfDay.TotalSeconds > 0;
        cell.Style.Numberformat.Format = hasTimeComponent
            ? "yyyy-MM-dd HH:mm:ss"
            : "yyyy-MM-dd";
    }

    private static void FormatDateTimeOffset(ExcelRange cell, DateTimeOffset dateOffset)
    {
        bool hasTimeComponent = dateOffset.TimeOfDay.TotalSeconds > 0;
        cell.Style.Numberformat.Format = hasTimeComponent
            ? "yyyy-MM-dd HH:mm:ss \"GMT\"z"
            : "yyyy-MM-dd";
    }

    private static bool IsNumericType(Type type)
    {
        return type == typeof(int) || type == typeof(long) || type == typeof(short) ||
               type == typeof(decimal) || type == typeof(double) || type == typeof(float) ||
               type == typeof(byte);
    }

    private static bool MightBeCurrency(string propertyName)
    {
        if (string.IsNullOrEmpty(propertyName)) return false;

        foreach (var hint in _currencyNameHints)
        {
            if (propertyName.IndexOf(hint, StringComparison.OrdinalIgnoreCase) >= 0) return true;
        }

        return false;
    }

    private static void ApplyNumericRangeColorMap(
        ExcelRange cell,
        ExportExcelPropertyInfoConfig prop,
        object? value)
    {
        if (!string.IsNullOrEmpty(prop.ExportAttr!.NumericRangeColorMap) && value != null)
        {
            if (decimal.TryParse(value.ToString(), out decimal currentValue))
            {
                var colorMap = JsonSerializer.Deserialize<Dictionary<string, string>>
                    (prop.ExportAttr.NumericRangeColorMap.Replace("'", "\""), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (colorMap != null)
                {
                    foreach (var each in colorMap)
                    {
                        var rangeKey = each.Key;
                        var values = rangeKey.Split("-");

                        if (values == null || values.Length != 2)
                        {
                            throw new Exception($"Invalid NumericRangeColorMap format for property \"{prop.Property!.Name}\". " +
                                $"The range key \"{rangeKey}\" is not in the required format \"min-max\". " +
                                $"Example: \"0-100\" or \"min-100\" or \"0-max\".");
                        }

                        var fromValueStr = values[0].Trim().ToLower();
                        var toValueStr = values[1].Trim().ToLower();

                        decimal fromValue, toValue;

                        if (fromValueStr == "min")
                        {
                            fromValue = decimal.MinValue;
                        }
                        else if (!decimal.TryParse(fromValueStr, out fromValue))
                        {
                            throw new Exception($"Invalid lower bound in ValueRangeColorMap for property \"{prop.Property!.Name}\". " +
                                $"Could not parse \"{fromValueStr}\" as a decimal value. " +
                                $"Use a valid decimal number or \"min\" for lowest possible value. " +
                                $"Example: \"0-100\":\"#FFFF00\" or \"min-100\":\"#FFFF00\"");
                        }

                        if (toValueStr == "max")
                        {
                            toValue = decimal.MaxValue;
                        }
                        else if (!decimal.TryParse(toValueStr, out toValue))
                        {
                            throw new Exception($"Invalid upper bound in ValueRangeColorMap for property \"{prop.Property!.Name}\". " +
                                $"Could not parse \"{toValueStr}\" as a decimal value. " +
                                $"Use a valid decimal number or \"max\" for highest possible value. " +
                                $"Example: \"0-100\":\"#FFFF00\" or \"0-max\":\"#FFFF00\"");
                        }

                        if (currentValue >= fromValue && currentValue <= toValue)
                        {
                            Color color = ColorTranslator.FromHtml(each.Value);

                            cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
                            cell.Style.Fill.BackgroundColor.SetColor(color);

                            break;
                        }
                    }
                }
            }
        }
    }

    private static void ApplyValueColorMap(
        ExcelRange cell,
        ExportExcelPropertyInfoConfig prop,
        object? value)
    {
        if (!string.IsNullOrEmpty(prop.ExportAttr!.ValueColorMap) && value != null)
        {
            string stringColor = value?.ToString() ?? string.Empty;

            var colorMap = JsonSerializer.Deserialize<Dictionary<string, string>>
                (prop.ExportAttr.ValueColorMap.Replace("'", "\""), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (colorMap != null && colorMap.ContainsKey(stringColor))
            {
                Color color = ColorTranslator.FromHtml(colorMap[stringColor]);

                cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
                cell.Style.Fill.BackgroundColor.SetColor(color);
            }
        }
    }

    private static void CheckDuplicateColorMapping(
        ExportExcelPropertyInfoConfig prop,
        object? value)
    {
        if (!string.IsNullOrEmpty(prop.ExportAttr!.ValueColorMap) && value != null
                    && !string.IsNullOrEmpty(prop.ExportAttr!.NumericRangeColorMap) && value != null)
        {
            throw new Exception($"Property \"{prop.Property!.Name}\" has both ValueColorMap and NumericRangeColorMap configured. " +
                $"Please use only one color mapping type per property.");
        }
    }

    private static void ApplHyperlinkStyle(
        ExcelRange cell,
        object? value)
    {
        if (value is string stringUrl && Uri.TryCreate(stringUrl, UriKind.Absolute, out _))
        {
            try
            {
                cell.Hyperlink = new Uri(stringUrl);
                cell.Style.Font.Color.SetColor(Color.Blue);
                cell.Style.Font.UnderLine = true;
            }
            catch { }
        }
    }

    private static void ApplyWrapTextStyle(
        ExcelWorksheet worksheet,
        ExcelRange cell,
        object? value,
        int wrapTextLength,
        int currentCol,
        HashSet<int> columnsWithWrapText)
    {
        if (value is string stringValue && stringValue.Length > wrapTextLength)
        {
            cell.Style.WrapText = true;

            columnsWithWrapText.Add(currentCol + 1);

            double minWidth = wrapTextLength * 1.08;

            if (worksheet.Column(currentCol + 1).Width < minWidth)
            {
                worksheet.Column(currentCol + 1).Width = minWidth;
            }
        }
    }

    private static void AutoApplyFormatByPropertyNamePatterns(
        ExportExcelPropertyInfoConfig prop,
        object? value,
        ExcelRange cell)
    {
        if (string.IsNullOrEmpty(prop.ExportAttr!.Format) && value != null)
        {
            string propertyName = prop.Property!.Name.ToLower();

            bool mightBeCurrency = propertyName.Contains("price") ||
                                   propertyName.Contains("cost") ||
                                   propertyName.Contains("amount") ||
                                   propertyName.Contains("total") ||
                                   propertyName.Contains("revenue") ||
                                   propertyName.Contains("budget") ||
                                   propertyName.Contains("payment") ||
                                   propertyName.Contains("salary") ||
                                   propertyName.Contains("income");

            if (mightBeCurrency && (
                value is decimal ||
                value is double ||
                value is float ||
                value is int ||
                value is long))
            {
                cell.Style.Numberformat.Format = "$#,##0.00";
            }
        }

    }

    private static List<ExportExcelPropertyInfoConfig> GetPropertiesInfo<T>(string[]? redundantCols = null)
    {
        var properties = typeof(T).GetProperties()
            .Select(p => new ExportExcelPropertyInfoConfig
            {
                Property = p,
                ExportAttr = p.GetCustomAttribute<ExportExcelAttribute>(),
            })
            .Where(x => x.ExportAttr != null)
            .ToList();

        // Remove redundant columns
        if (redundantCols != null && redundantCols.Any())
        {
            properties = properties
                .Where(x => !redundantCols.Contains(x.ExportAttr!.HeaderName!) &&
                           !redundantCols.Contains(x.Property!.Name))
                .ToList();
        }

        return properties;
    }

    private static void ApplyFilterToAllColumns(
        ExcelWorksheet worksheet,
        int colIndex,
        int headerRow,
        int lastDataRow,
        int lastColumnIndex)
    {
        var filterRange = worksheet.Cells[headerRow, colIndex + 1, lastDataRow, lastColumnIndex];
        filterRange.AutoFilter = true;
    }

    private static string GetExcelColumnName(int columnNumber)
    {
        string columnName = string.Empty;
        while (columnNumber > 0)
        {
            int remainder = (columnNumber - 1) % 26;
            char letter = (char)('A' + remainder);
            columnName = letter + columnName;
            columnNumber = (columnNumber - 1) / 26;
        }
        return columnName;
    }

    private static void AddTitleToWorksheet(
        ExcelWorksheet worksheet,
        string title,
        float fontSize = 14,
        bool isBold = true)
    {
        const int DEFAULT_START_ROW = 0;
        const int DEFAULT_START_COLUMN = 0;
        const double ROW_HEIGHT_FACTOR = 1.5;

        if (worksheet == null || string.IsNullOrEmpty(title)) return;

        // Convert 0-based index to 1-based (EPPlus)
        int startRowIndex = DEFAULT_START_ROW + 1;
        int startColIndex = DEFAULT_START_COLUMN + 1;

        // Determine the end column for merging
        int epplusEndCol;
        if (worksheet.Dimension != null)
        {
            epplusEndCol = worksheet.Dimension.End.Column;
        }
        else
        {
            const int DEFAULT_COLUMN_SPAN = 6;
            epplusEndCol = startColIndex + DEFAULT_COLUMN_SPAN - 1;
        }

        var titleRange = worksheet.Cells[startRowIndex, startColIndex, startRowIndex, epplusEndCol];

        titleRange.Value = title;
        titleRange.Merge = true;
        titleRange.Style.Font.Size = fontSize;
        titleRange.Style.Font.Bold = isBold;
        titleRange.Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
        titleRange.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
        titleRange.Style.Font.Color.SetColor(Color.Blue);

        worksheet.Row(startRowIndex).Height = fontSize * ROW_HEIGHT_FACTOR;
    }

    private static void AutoFitColumns(
        ExcelWorksheet worksheet,
        HashSet<int>? columnsWithWrapText = null)
    {
        if (worksheet == null || worksheet.Dimension == null) return;

        columnsWithWrapText ??= new HashSet<int>();

        int startCol = worksheet.Dimension.Start.Column;
        int endCol = worksheet.Dimension.End.Column;

        // Auto-fit each column that doesn't have wrap text
        for (int col = startCol; col <= endCol; col++)
        {
            if (!columnsWithWrapText.Contains(col))
            {
                worksheet.Column(col).AutoFit();
            }
        }
    }

    private static void ApplyDefaultFormattingSummaryFunction(
        ExcelRange cell,
        string functionName,
        Type propType)
    {
        switch (functionName.ToUpper())
        {
            case "SUM":
            case "SUBTOTAL":
                if (propType == typeof(int) || propType == typeof(long) ||
                    propType == typeof(int?) || propType == typeof(long?))
                {
                    cell.Style.Numberformat.Format = "#,##0";
                }
                else
                {
                    cell.Style.Numberformat.Format = "#,##0.00";
                }
                break;
            case "AVERAGE":
            case "MEDIAN":
                cell.Style.Numberformat.Format = "#,##0.00";
                break;
            case "MIN":
            case "MAX":
                if (propType == typeof(int) || propType == typeof(long) ||
                    propType == typeof(int?) || propType == typeof(long?))
                {
                    cell.Style.Numberformat.Format = "#,##0";
                }
                else
                {
                    cell.Style.Numberformat.Format = "#,##0.00";
                }
                break;
            case "COUNT":
            case "COUNTA":
            case "COUNTBLANK":
                cell.Style.Numberformat.Format = "#,##0";
                break;
            case "STDEV":
            case "STDEVP":
            case "VAR":
            case "VARP":
                cell.Style.Numberformat.Format = "#,##0.00";
                break;
            default:
                if (propType == typeof(int) || propType == typeof(long) ||
                    propType == typeof(int?) || propType == typeof(long?))
                {
                    cell.Style.Numberformat.Format = "#,##0";
                }
                else if (propType == typeof(float) || propType == typeof(double) || propType == typeof(decimal) ||
                         propType == typeof(float?) || propType == typeof(double?) || propType == typeof(decimal?))
                {
                    cell.Style.Numberformat.Format = "#,##0.00";
                }
                break;
        }
    }

    #endregion
}