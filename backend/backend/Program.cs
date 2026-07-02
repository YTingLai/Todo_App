using backend.Models;
using backend.Services;
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

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors("frontend");  // 啟用 CORS ( 跨來源資源共享 )

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");  // 提供 Health Checks API 端點

app.Run();
