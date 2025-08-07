namespace SourceCommon.Configurations;

public class MessageBrokerOptions
{
    #region Constants

    public const string Section = "MessageBroker";

    #endregion

    #region Fields, Properties and Indexers

    public string? Host { get; set; }

    public int Port { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    #endregion
}
