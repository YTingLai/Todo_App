using backend.Errors;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// 註冊 DbContext 的 DI ( 依賴注入 )
builder.Services.AddDbContext<TodoAppContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TodoAppDatabase"))
);

// 註冊 Health Checks，檢查資料庫連線狀態
builder.Services.AddHealthChecks().AddDbContextCheck<TodoAppContext>();

// 註冊 Service 的 DI ( 依賴注入 )
builder.Services.AddScoped<ITodoService, TodoService>();

// 註冊 CORS ( 跨來源資源共享 )
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 覆寫 ApiController 驗證失敗時的 Response
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        string errorMessage = "輸入資料錯誤";

        // 取得 ModelState 中第一個有錯誤的欄位的第一個錯誤訊息
        foreach (var model in context.ModelState)
        {
            if(model.Value.Errors.Count > 0)
            {
                errorMessage = model.Value.Errors[0].ErrorMessage;
                break;
            }
        }

        return new BadRequestObjectResult(
                ErrorResponseFactory.ValidationError(errorMessage));
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.

// 放在第一個，攔截所有 Middleware 可能拋出的 Exception
app.UseMiddleware<GlobalExceptionMiddleware>();  // 啟用全域例外處理 Middleware，統一攔截未處理的 Exception

app.UseHttpsRedirection();

app.UseCors("frontend");  // 啟用 CORS ( 跨來源資源共享 )

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");  // 提供 Health Checks API 端點

app.Run();
