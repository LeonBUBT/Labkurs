using LMS.Domain.Common;
using LMS.Domain.Entities.Identity;

namespace LMS.Domain.Entities;

public class QuizAttempt : BaseEntity
{
    public Guid QuizId { get; set; }
    public Guid StudentId { get; set; }
    public int Score { get; set; }
    public bool IsPassed { get; set; }
    public DateTime AttemptedAt { get; set; } = DateTime.UtcNow;

    public Quiz Quiz { get; set; } = null!;
    public ApplicationUser Student { get; set; } = null!;
}
