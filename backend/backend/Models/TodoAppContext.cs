using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class TodoAppContext : DbContext
{
    // 資料庫連線設定
    public TodoAppContext(DbContextOptions<TodoAppContext> options) : base(options)
    {
    }
}
