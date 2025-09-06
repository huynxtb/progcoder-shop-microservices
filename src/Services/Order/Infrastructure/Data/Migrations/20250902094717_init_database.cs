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
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "inventory_histories",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    inventory_item_id = table.Column<Guid>(type: "char(36)", nullable: false),
                    changed_at = table.Column<DateTimeOffset>(type: "datetime", nullable: false),
                    change_amount = table.Column<int>(type: "int", nullable: false),
                    quantity_after_change = table.Column<int>(type: "int", nullable: false),
                    source = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventory_histories", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "inventory_items",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    reserved = table.Column<int>(type: "int", nullable: false),
                    location_address = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    product_id = table.Column<Guid>(type: "char(50)", maxLength: 50, nullable: false),
                    product_name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    created_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: false),
                    created_by = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    last_modified_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    last_modified_by = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventory_items", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "inventory_reservations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    reference_id = table.Column<Guid>(type: "char(36)", nullable: false),
                    quantity = table.Column<long>(type: "bigint", nullable: false),
                    expires_at = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    status = table.Column<string>(type: "varchar(255)", nullable: false, defaultValue: "Pending"),
                    location_address = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    product_id = table.Column<Guid>(type: "char(50)", maxLength: 50, nullable: false),
                    product_name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    created_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: false),
                    created_by = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    last_modified_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    last_modified_by = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventory_reservations", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "outbox_messages",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    event_type = table.Column<string>(type: "varchar(255)", nullable: false),
                    content = table.Column<string>(type: "longtext", nullable: false),
                    occurred_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: false),
                    processed_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    Error = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_outbox_messages", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_histories_inventory_item_id_changed_at",
                table: "inventory_histories",
                columns: new[] { "inventory_item_id", "changed_at" });

            migrationBuilder.CreateIndex(
                name: "IX_inventory_reservations_reference_id",
                table: "inventory_reservations",
                column: "reference_id");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_reservations_status_expires_at",
                table: "inventory_reservations",
                columns: new[] { "status", "expires_at" });

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
                name: "inventory_histories");

            migrationBuilder.DropTable(
                name: "inventory_items");

            migrationBuilder.DropTable(
                name: "inventory_reservations");

            migrationBuilder.DropTable(
                name: "outbox_messages");
        }
    }
}
