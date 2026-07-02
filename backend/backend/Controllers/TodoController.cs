using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoController : ControllerBase
{
    // 使用 Service 的 DI ( 依賴注入 )
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    // GET : api/Todo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoDto>>> GetAllTodo()
    {
        var todos = await _todoService.GetAllTodoAsync();

        return Ok(todos);  // HTTP Status : 200
    }
}
