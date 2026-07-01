using backend.Models;
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

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");  // 提供 Health Checks API 端點

app.Run();
