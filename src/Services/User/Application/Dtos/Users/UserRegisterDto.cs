namespace User.Application.Dtos.Users;

public sealed class UserRegisterDto : CreateUserDto
{
    #region Fields, Properties and Indexers

    public string? ConfirmPassword { get; set; }

    #endregion
}
