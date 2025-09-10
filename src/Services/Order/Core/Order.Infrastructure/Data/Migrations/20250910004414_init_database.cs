using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Order.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class init_database : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    total_price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    customer_email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    customer_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    customer_phone_number = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    order_no = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    shipping_address_line = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    shipping_country = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    shipping_email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    shipping_first_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    shipping_last_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    shipping_state = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    shipping_zip_code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    created_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    last_modified_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    last_modified_by = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "outbox_messages",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    event_type = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    occurred_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    processed_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    error = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_outbox_messages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "order_items",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    order_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    product_image_url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    product_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    product_price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    created_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    last_modified_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    last_modified_by = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order_items", x => x.id);
                    table.ForeignKey(
                        name: "FK_order_items_orders_order_id",
                        column: x => x.order_id,
                        principalTable: "orders",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_order_items_order_id",
                table: "order_items",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_event_type",
                table: "outbox_messages",
                column: "event_type");

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_occurred_on_utc",
                table: "outbox_messages",
                column: "occurred_on_utc");

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_processed_on_utc",
                table: "outbox_messages",
                column: "processed_on_utc");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "order_items");

            migrationBuilder.DropTable(
                name: "outbox_messages");

            migrationBuilder.DropTable(
                name: "orders");
        }
    }
}
