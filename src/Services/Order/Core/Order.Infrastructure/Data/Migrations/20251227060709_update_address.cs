using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Order.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class update_address : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "shipping_email",
                table: "orders");

            migrationBuilder.RenameColumn(
                name: "shipping_name",
                table: "orders",
                newName: "shipping_ward");

            migrationBuilder.AddColumn<string>(
                name: "shipping_city",
                table: "orders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "shipping_district",
                table: "orders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "shipping_city",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "shipping_district",
                table: "orders");

            migrationBuilder.RenameColumn(
                name: "shipping_ward",
                table: "orders",
                newName: "shipping_name");

            migrationBuilder.AddColumn<string>(
                name: "shipping_email",
                table: "orders",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }
    }
}
