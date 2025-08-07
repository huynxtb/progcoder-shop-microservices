namespace SourceCommon.Configurations;

public class LogServerOptions
{
    #region Constants

    public const string Section = "LogServer";
    #endregion

    #region Fields, Properties and Indexers

    public string? Host { get; set; }

    public int Port { get; set; } = 514;

    public string? UserName { get; set; } = "udp";

    public string? Password { get; set; } = "local0";

    public string? ApplicationName { get; set; }

    #endregion
}
