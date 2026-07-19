using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class TodoService : ITodoService
{
    // 使用 DbContext 的 DI ( 依賴注入 )
    private readonly TodoAppContext _context;

    public TodoService(TodoAppContext context)
    {
        _context = context;
    }

    // 封裝 Entity 轉換為 DTO 的映射邏輯，供各方法共用
    private static TodoDto ToTodoDto(Todo todo)
    {
        return new TodoDto
        {
            Id = todo.Id,
            Content = todo.Content,
            IsCompleted = todo.IsCompleted
        };
    }

    // 取得多筆 Todo
    public async Task<IEnumerable<TodoDto>> GetAllTodoAsync()
    {
        // 根據 DTO 的形式取得所有的資料
        var todos = await _context.Todo
                    .Select(todo => new TodoDto
                    {
                        Id = todo.Id,
                        Content = todo.Content,
                        IsCompleted = todo.IsCompleted
                    })
                    .ToListAsync();

        return todos;
    }

    // 取得單筆 Todo
    public async Task<TodoDto?> GetTodoByIdAsync(int id)
    {
        // 在資料庫內查詢與傳入 Id 相同的資料
        var todo = await _context.Todo.FindAsync(id);

        // 沒有找到符合的資料
        if(todo == null)
        {
            return null;
        }

        // 將資料轉成 DTO 的形式再回傳
        var response = ToTodoDto(todo);

        return response;
    }

    // 新增 Todo
    public async Task<TodoDto> AddTodoAsync(AddTodoDto request)
    {
        // 建立一筆 Todo 的 Entity
        var todo = new Todo
        {
            Content = request.Content
        };

        // 將資料存入資料庫
        _context.Todo.Add(todo);
        await _context.SaveChangesAsync();

        // 將資料轉成 DTO 的形式再回傳
        var response = ToTodoDto(todo);

        return response;
    }
}
