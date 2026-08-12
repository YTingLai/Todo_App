using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class AddTodoDto
{
    [StringLength(100, ErrorMessage = "內容不能超過 100 個字")]
    [Required(ErrorMessage = "內容必填")]
    public required string Content { get; set; }
}
