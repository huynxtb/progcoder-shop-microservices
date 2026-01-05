using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Order.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class update_outbox_msg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_outbox_messages_claimed_on_utc",
                table: "outbox_messages");

            migrationBuilder.DropIndex(
                name: "IX_outbox_messages_processed_on_utc_claimed_on_utc",
                table: "outbox_messages");

            migrationBuilder.DropColumn(
                name: "claimed_on_utc",
                table: "outbox_messages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "claimed_on_utc",
                table: "outbox_messages",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_claimed_on_utc",
                table: "outbox_messages",
                column: "claimed_on_utc");

            migrationBuilder.CreateIndex(
                name: "IX_outbox_messages_processed_on_utc_claimed_on_utc",
                table: "outbox_messages",
                columns: new[] { "processed_on_utc", "claimed_on_utc" });
        }
    }
}
