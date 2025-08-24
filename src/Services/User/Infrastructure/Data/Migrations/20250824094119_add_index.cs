using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class add_index : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "KeycloakUserNo",
                table: "users",
                newName: "keycloak_user_no");

            migrationBuilder.AlterColumn<string>(
                name: "keycloak_user_no",
                table: "users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_keycloak_user_no",
                table: "users",
                column: "keycloak_user_no",
                unique: true,
                filter: "[keycloak_user_no] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_users_keycloak_user_no",
                table: "users");

            migrationBuilder.RenameColumn(
                name: "keycloak_user_no",
                table: "users",
                newName: "KeycloakUserNo");

            migrationBuilder.AlterColumn<string>(
                name: "KeycloakUserNo",
                table: "users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);
        }
    }
}
