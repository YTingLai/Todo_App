namespace backend.Errors;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public GlobalExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            // 將 Request 交給後續的 Middleware 和 Controller 執行，若過程中拋出 Exception，會被 catch 接住
            await _next(context);
        }
        catch(Exception)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsJsonAsync(ErrorResponseFactory.InternalServerError());
        }
    }
}
