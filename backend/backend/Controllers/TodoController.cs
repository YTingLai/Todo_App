using backend.Dtos;
using backend.Errors;
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

    // 回傳 Todo 不存在時的 404 Not Found
    private NotFoundObjectResult TodoNotFound()
    {
        return NotFound(
                ErrorResponseFactory.NotFound(
                    ErrorCode.TodoNotFound,
                    "Todo 不存在"));  // HTTP Status : 404
    }

    // GET : api/Todo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoDto>>> GetAllTodo()
    {
        var todos = await _todoService.GetAllTodoAsync();

        return Ok(todos);  // HTTP Status : 200
    }

    // GET : api/Todo/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoDto>> GetTodoById(int id)
    {
        var todo = await _todoService.GetTodoByIdAsync(id);

        // 取得失敗
        if(todo == null)
        {
            return TodoNotFound();
        }

        // 取得成功
        return Ok(todo);
    }

    // POST : api/Todo
    [HttpPost]
    public async Task<ActionResult<TodoDto>> AddTodo(AddTodoDto request)
    {
        var todo = await _todoService.AddTodoAsync(request);

        return CreatedAtAction(
                nameof(GetTodoById),
                new { id = todo.Id },
                todo);  // HTTP Status : 201
    }

    // DELETE : api/Todo/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTodo(int id)
    {
        var result = await _todoService.DeleteTodoAsync(id);

        // 刪除失敗
        if(!result)
        {
            return TodoNotFound();
        }

        // 刪除成功
        return NoContent();  // HTTP Status : 204
    }

    // PUT : api/Todo/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<TodoDto>> EditTodo(int id, EditTodoDto request)
    {
        var todo = await _todoService.EditTodoAsync(id, request);

        // 編輯失敗
        if(todo == null)
        {
            return TodoNotFound();
        }

        // 編輯成功
        return Ok(todo);
    }

    // PATCH : api/Todo/{id}
    [HttpPatch("{id}")]
    public async Task<ActionResult<TodoDto>> ToggleCompleted(int id)
    {
        var todo = await _todoService.ToggleCompletedAsync(id);

        // 切換失敗
        if(todo == null)
        {
            return TodoNotFound();
        }

        // 切換成功
        return Ok(todo);
    }
}
