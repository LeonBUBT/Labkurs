using LMS.Domain.Common;
using LMS.Domain.Entities.Identity;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class Enrollment : BaseEntity
{
    public Guid StudentId { get; set; }
    public Guid CourseId { get; set; }
    public EnrollmentStatus Status { get; set; } = EnrollmentStatus.Active;
    public int Progress { get; set; }
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }

    public ApplicationUser Student { get; set; } = null!;
    public Course Course { get; set; } = null!;
    public Certificate? Certificate { get; set; }
}
