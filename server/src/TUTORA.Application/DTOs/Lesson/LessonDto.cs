using LMS.Domain.Enums;

namespace LMS.Application.DTOs.Lesson;

public record LessonDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string? Content { get; init; }
    public string? VideoUrl { get; init; }
    public int Order { get; init; }
    public int DurationMinutes { get; init; }
    public LessonType Type { get; init; }
    public Guid ModuleId { get; init; }
}

public record CreateLessonDto
{
    public string Title { get; init; } = string.Empty;
    public string? Content { get; init; }
    public string? VideoUrl { get; init; }
    public int Order { get; init; }
    public int DurationMinutes { get; init; }
    public LessonType Type { get; init; }
}

public record UpdateLessonDto
{
    public string Title { get; init; } = string.Empty;
    public string? Content { get; init; }
    public string? VideoUrl { get; init; }
    public int Order { get; init; }
    public int DurationMinutes { get; init; }
    public LessonType Type { get; init; }
}
