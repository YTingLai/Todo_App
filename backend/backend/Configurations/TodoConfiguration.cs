using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Configurations;

public class TodoConfiguration : IEntityTypeConfiguration<Todo>
{
    public void Configure(EntityTypeBuilder<Todo> builder)
    {
        // 資料表名稱
        builder.ToTable("Todo");
        // 主鍵
        builder.HasKey(e => e.Id);
        // 欄位規則
        builder.Property(e => e.Content)
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(e => e.IsCompleted)
            .HasDefaultValue(false);
        builder.Property(e => e.CreatedAt)
            .HasDefaultValueSql("getdate()");
        builder.Property(e => e.UpdatedAt);
        builder.Property(e => e.CompletedAt);
    }
}
