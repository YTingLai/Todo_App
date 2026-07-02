namespace backend.Dtos;

public class TodoDto
{
    public int Id { get; set; }

    public required string Content { get; set; }

    public bool IsCompleted { get; set; }
}
