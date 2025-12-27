using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Order.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class update_order_address : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "shipping_district",
                table: "orders");

            migrationBuilder.RenameColumn(
                name: "shipping_zip_code",
                table: "orders",
                newName: "shipping_postal_code");

            migrationBuilder.RenameColumn(
                name: "shipping_ward",
                table: "orders",
                newName: "shipping_subdivision");

            migrationBuilder.RenameColumn(
                name: "shipping_state",
                table: "orders",
                newName: "shipping_state_or_province");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "shipping_subdivision",
                table: "orders",
                newName: "shipping_ward");

            migrationBuilder.RenameColumn(
                name: "shipping_state_or_province",
                table: "orders",
                newName: "shipping_state");

            migrationBuilder.RenameColumn(
                name: "shipping_postal_code",
                table: "orders",
                newName: "shipping_zip_code");

            migrationBuilder.AddColumn<string>(
                name: "shipping_district",
                table: "orders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }
    }
}
