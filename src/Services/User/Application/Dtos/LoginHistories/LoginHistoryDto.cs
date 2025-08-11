namespace Application.Dtos.LoginHistories;

public class LoginHistoryDto
{
    #region Fields, Properties and Indexers

    public string? IpAddress { get; set; }

    public DateTimeOffset LoggedAt { get; set; }

    #endregion
}
