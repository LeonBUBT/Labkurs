using TUTORA.Domain.Common;
using TUTORA.Domain.Entities.Identity;
using TUTORA.Domain.Enums;

namespace TUTORA.Domain.Entities;

public class Course : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public decimal Price { get; set; }
    public CourseLevel Level { get; set; }
    public CourseStatus Status { get; set; } = CourseStatus.Draft;
    public Guid InstructorId { get; set; }
    public Guid CategoryId { get; set; }

    public ApplicationUser Instructor { get; set; } = null!;
    public CourseCategory Category { get; set; } = null!;
    public ICollection<Module> Modules { get; set; } = [];
    public ICollection<Enrollment> Enrollments { get; set; } = [];
}