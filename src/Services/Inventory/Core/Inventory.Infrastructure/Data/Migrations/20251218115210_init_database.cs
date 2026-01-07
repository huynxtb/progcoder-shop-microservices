using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory.Infrastructure.Data.Migrations
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
                    message = table.Column<string>(type: "longtext", nullable: false),
                    created_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: false),
                    created_by = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    last_modified_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    last_modified_by = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventory_histories", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "locations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    location = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    CreatedOnUtc = table.Column<DateTimeOffset>(type: "datetime", nullable: false),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true),
                    LastModifiedOnUtc = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locations", x => x.id);
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
                    last_error_message = table.Column<string>(type: "longtext", nullable: true),
                    claimed_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    attempt_count = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    max_attempts = table.Column<int>(type: "int", nullable: false, defaultValue: 3),
                    next_attempt_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_outbox_messages", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "inventory_items",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    reserved = table.Column<int>(type: "int", nullable: false),
                    location_id = table.Column<Guid>(type: "char(36)", nullable: false),
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
                    table.ForeignKey(
                        name: "FK_inventory_items_locations_location_id",
                        column: x => x.location_id,
                        principalTable: "locations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "inventory_reservations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    reference_id = table.Column<Guid>(type: "char(36)", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    expires_at = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    status = table.Column<int>(type: "int", nullable: false),
                    location_id = table.Column<Guid>(type: "char(36)", nullable: false),
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
                    table.ForeignKey(
                        name: "FK_inventory_reservations_locations_location_id",
                        column: x => x.location_id,
                        principalTable: "locations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_items_location_id",
                table: "inventory_items",
                column: "location_id");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_reservations_location_id",
                table: "inventory_reservations",
                column: "location_id");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_reservations_reference_id",
                table: "inventory_reservations",
                column: "reference_id");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_reservations_status_expires_at",
                table: "inventory_reservations",
                columns: new[] { "status", "expires_at" });

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_claimed_on_utc",
                table: "outbox_messages",
                column: "claimed_on_utc");

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_event_type",
                table: "outbox_messages",
                column: "event_type");

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_next_attempt_on_utc_processed_on_utc_attempt~",
                table: "outbox_messages",
                columns: new[] { "next_attempt_on_utc", "processed_on_utc", "attempt_count" });

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_occurred_on_utc",
                table: "outbox_messages",
                column: "occurred_on_utc");

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_processed_on_utc",
                table: "outbox_messages",
                column: "processed_on_utc");

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_processed_on_utc_attempt_count_max_attempts",
                table: "outbox_messages",
                columns: new[] { "processed_on_utc", "attempt_count", "max_attempts" });

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_processed_on_utc_claimed_on_utc",
                table: "outbox_messages",
                columns: new[] { "processed_on_utc", "claimed_on_utc" });
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

            migrationBuilder.DropTable(
                name: "locations");
        }
    }
}
