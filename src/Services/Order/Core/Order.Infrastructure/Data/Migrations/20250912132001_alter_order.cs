using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Order.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class alter_order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "shipping_first_name",
                table: "orders");

            migrationBuilder.RenameColumn(
                name: "shipping_last_name",
                table: "orders",
                newName: "shipping_name");

            migrationBuilder.AddColumn<Guid>(
                name: "customer_id",
                table: "orders",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "customer_id",
                table: "orders");

            migrationBuilder.RenameColumn(
                name: "shipping_name",
                table: "orders",
                newName: "shipping_last_name");

            migrationBuilder.AddColumn<string>(
                name: "shipping_first_name",
                table: "orders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }
    }
}
