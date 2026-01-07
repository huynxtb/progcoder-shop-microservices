using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory.Infrastructure.Data.Migrations
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
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    event_type = table.Column<string>(type: "longtext", nullable: false),
                    content = table.Column<string>(type: "longtext", nullable: false),
                    received_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: false),
                    processed_on_utc = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    last_error_message = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inbox_messages", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_inbox_messages_processed_on_utc",
                table: "inbox_messages",
                column: "processed_on_utc");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "inbox_messages");
        }
    }
}
