using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class remove_keycloak_user_no : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_users_keycloak_user_no",
                table: "users");

            migrationBuilder.DropColumn(
                name: "keycloak_user_no",
                table: "users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "keycloak_user_no",
                table: "users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_keycloak_user_no",
                table: "users",
                column: "keycloak_user_no",
                unique: true,
                filter: "[keycloak_user_no] IS NOT NULL");
        }
    }
}
