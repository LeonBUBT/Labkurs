using LMS.Domain.Enums;

namespace LMS.Application.DTOs.Course;

public record CourseDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string? ThumbnailUrl { get; init; }
    public decimal Price { get; init; }
    public CourseLevel Level { get; init; }
    public CourseStatus Status { get; init; }
    public string InstructorName { get; init; } = string.Empty;
    public string CategoryName { get; init; } = string.Empty;
    public Guid InstructorId { get; init; }
    public Guid CategoryId { get; init; }
    public int EnrollmentCount { get; init; }
}

public record CourseDetailDto : CourseDto
{
    public IEnumerable<ModuleDto> Modules { get; init; } = [];
}

// Nested summary DTOs used only inside CourseDto files
public record ModuleDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public int Order { get; init; }
    public IEnumerable<LessonSummaryDto> Lessons { get; init; } = [];
}

public record LessonSummaryDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public int Order { get; init; }
    public int DurationMinutes { get; init; }
    public string Type { get; init; } = string.Empty;
}

public record CreateCourseDto
{
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string? ThumbnailUrl { get; init; }
    public decimal Price { get; init; }
    public CourseLevel Level { get; init; }
    public Guid CategoryId { get; init; }
}

public record UpdateCourseDto
{
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string? ThumbnailUrl { get; init; }
    public decimal Price { get; init; }
    public CourseLevel Level { get; init; }
    public Guid CategoryId { get; init; }
}
