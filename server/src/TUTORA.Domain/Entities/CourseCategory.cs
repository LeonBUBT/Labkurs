using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class CourseCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ICollection<Course> Courses { get; set; } = [];
}
