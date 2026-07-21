using backend.Dtos;

namespace backend.Services;

public interface ITodoService
{
    Task<IEnumerable<TodoDto>> GetAllTodoAsync();

    Task<TodoDto?> GetTodoByIdAsync(int id);

    Task<TodoDto> AddTodoAsync(AddTodoDto request);

    Task<bool> DeleteTodoAsync(int id);
}
