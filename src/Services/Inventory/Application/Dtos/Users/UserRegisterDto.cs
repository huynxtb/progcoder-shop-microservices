namespace Inventory.Application.Dtos.Users;

public class UserRegisterDto : CreateUserDto
{
    #region Fields, Properties and Indexers

    public string? ConfirmPassword { get; set; }

    #endregion
}
