namespace LMS.Application.DTOs.Certificate;

public record CertificateDto
{
    public Guid Id { get; init; }
    public Guid StudentId { get; init; }
    public Guid EnrollmentId { get; init; }
    public string StudentName { get; init; } = string.Empty;
    public string CourseTitle { get; init; } = string.Empty;
    public string VerificationCode { get; init; } = string.Empty;
    public DateTime IssuedAt { get; init; }
}
