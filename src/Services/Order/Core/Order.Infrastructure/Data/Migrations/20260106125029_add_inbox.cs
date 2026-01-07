using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Order.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class add_inbox : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "inbox_messages",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    event_type = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    received_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    processed_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    last_error_message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    attempt_count = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    max_attempts = table.Column<int>(type: "int", nullable: false, defaultValue: 3),
                    next_attempt_on_utc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inbox_messages", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_inbox_messages_event_type",
                table: "inbox_messages",
                column: "event_type");

            migrationBuilder.CreateIndex(
                name: "IX_inbox_messages_next_attempt_on_utc_processed_on_utc_attempt_count",
                table: "inbox_messages",
                columns: new[] { "next_attempt_on_utc", "processed_on_utc", "attempt_count" });

            migrationBuilder.CreateIndex(
                name: "IX_inbox_messages_processed_on_utc",
                table: "inbox_messages",
                column: "processed_on_utc");

            migrationBuilder.CreateIndex(
                name: "IX_inbox_messages_processed_on_utc_attempt_count_max_attempts",
                table: "inbox_messages",
                columns: new[] { "processed_on_utc", "attempt_count", "max_attempts" });

            migrationBuilder.CreateIndex(
                name: "IX_inbox_messages_received_on_utc",
                table: "inbox_messages",
                column: "received_on_utc");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "inbox_messages");
        }
    }
}
