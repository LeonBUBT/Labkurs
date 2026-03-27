using Tutora.Domain.Common;
using Tutora.Domain.Entities.Identity;

namespace Tutora.Domain.Entities;

public class Certificate : BaseEntity
{
    public Guid StudentId { get; set; }
    public Guid EnrollmentId { get; set; }
    public string VerificationCode { get; set; } = Guid.NewGuid().ToString("N").ToUpper();
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

    public ApplicationUser Student { get; set; } = null!;
    public Enrollment Enrollment { get; set; } = null!;
}