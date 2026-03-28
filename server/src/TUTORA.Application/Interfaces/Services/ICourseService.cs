using LMS.Application.DTOs.Common;
using LMS.Application.DTOs.Course;

namespace LMS.Application.Interfaces.Services;

public interface ICourseService
{
    Task<PagedResultDto<CourseDto>> GetPublishedCoursesAsync(string? search, Guid? categoryId, int page, int pageSize);
    Task<CourseDetailDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<CourseDto>> GetByInstructorAsync(Guid instructorId);
    Task<IEnumerable<CourseDto>> GetAllForAdminAsync();
    Task<CourseDto> CreateAsync(Guid instructorId, CreateCourseDto dto);
    Task<CourseDto> UpdateAsync(Guid id, Guid instructorId, UpdateCourseDto dto, bool isAdmin = false);
    Task DeleteAsync(Guid id, Guid instructorId, bool isAdmin = false);
    Task<CourseDto> PublishAsync(Guid id, Guid instructorId, bool isAdmin = false);
}
