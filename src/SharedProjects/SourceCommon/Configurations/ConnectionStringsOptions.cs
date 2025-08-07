namespace SourceCommon.Configurations;

public class ConnectionStringsOptions
{
    #region Constants

    public const string Section = "ConnectionStrings";

    #endregion

    #region Fields, Properties and Indexers

    public string? DatabaseType { get; set; }

    public string? ReadDb { get; set; }

    public string? WriteDb { get; set; }

    #endregion
}
