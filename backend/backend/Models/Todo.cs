namespace backend.Models;

public class Todo
{
    public int Id { get; set; }

    // required : 物件在初始化時必須賦值
    public required string Content { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; }

    // ? : 可以有值，也可以是 null
    public DateTime? UpdatedAt { get; set; }

    public DateTime? CompletedAt { get; set; }
}
