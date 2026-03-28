using LMS.Domain.Enums;

namespace LMS.Application.DTOs.Enrollment;

public record EnrollmentDto
{
    public Guid Id { get; init; }
    public Guid StudentId { get; init; }
    public Guid CourseId { get; init; }
    public string CourseTitle { get; init; } = string.Empty;
    public EnrollmentStatus Status { get; init; }
    public int Progress { get; init; }
    public DateTime EnrolledAt { get; init; }
    public DateTime? CompletedAt { get; init; }
}

public record CreateEnrollmentDto
{
    public Guid CourseId { get; init; }
}

public record UpdateProgressDto
{
    public int Progress { get; init; }
}
