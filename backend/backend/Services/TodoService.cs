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
}
