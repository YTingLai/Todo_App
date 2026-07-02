using backend.Dtos;

namespace backend.Services;

public interface ITodoService
{
    Task<IEnumerable<TodoDto>> GetAllTodoAsync();
}
