namespace Common.Models.Reponses;

public sealed class ApiDefaultPathResponse
{
    #region Fields, Properties and Indexers

    public string Service { get; set; } = default!;

    public string Status { get; set; } = default!;

    public DateTimeOffset Timestamp { get; set; }

    public string Environment { get; set; } = default!;

    public Dictionary<string, string> Endpoints { get; set; } = default!;

    public string Message { get; set; } = default!;

    #endregion
}
