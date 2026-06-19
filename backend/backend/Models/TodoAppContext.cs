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
}
