using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class AddTodoDto
{
    [StringLength(100)]
    [Required]
    public required string Content { get; set; }
}
