namespace User.Application.Dtos.LoginHistories;

public class CreateLoginHistoryDto
{
    #region Fields, Properties and Indexers

    public Guid UserId { get; set; }

    public string? IpAddress { get; set; }

    #endregion
}
