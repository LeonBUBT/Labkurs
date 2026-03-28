using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class QuizAnswer : BaseEntity
{
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    public Guid QuestionId { get; set; }

    public QuizQuestion Question { get; set; } = null!;
}
