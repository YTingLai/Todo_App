using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class TodoAppContext : DbContext
{
    // 資料庫連線設定
    public TodoAppContext(DbContextOptions<TodoAppContext> options) : base(options)
    {
    }

    // 宣告 Entity 對應的資料表
    public DbSet<Todo> Todo { get; set; }

    // 自動套用所有 Entity 的 Fluent API 設定檔 ( Configuration )
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(TodoAppContext).Assembly
        );
    }
}
