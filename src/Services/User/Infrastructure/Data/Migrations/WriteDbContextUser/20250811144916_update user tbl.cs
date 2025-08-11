using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations.WriteDbContextUser
{
    /// <inheritdoc />
    public partial class updateusertbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "keycloak_user_id",
                table: "users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "keycloak_user_id",
                table: "users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
