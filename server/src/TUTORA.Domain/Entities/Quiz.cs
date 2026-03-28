using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Quiz : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int PassingScore { get; set; } = 70;
    public Guid LessonId { get; set; }

    public Lesson Lesson { get; set; } = null!;
    public ICollection<QuizQuestion> Questions { get; set; } = [];
    public ICollection<QuizAttempt> Attempts { get; set; } = [];
}
