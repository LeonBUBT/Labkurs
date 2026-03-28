using LMS.Domain.Common;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class Lesson : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Content { get; set; }
    public string? VideoUrl { get; set; }
    public int Order { get; set; }
    public int DurationMinutes { get; set; }
    public LessonType Type { get; set; }
    public Guid ModuleId { get; set; }

    public Module Module { get; set; } = null!;
    public ICollection<Quiz> Quizzes { get; set; } = [];
}
