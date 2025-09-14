using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Order.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class update_order_tbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "total_price",
                table: "orders",
                newName: "TotalPrice");

            migrationBuilder.RenameColumn(
                name: "line_total",
                table: "order_items",
                newName: "LineTotal");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "orders",
                newName: "total_price");

            migrationBuilder.RenameColumn(
                name: "LineTotal",
                table: "order_items",
                newName: "line_total");
        }
    }
}
