using LMS.Application.DTOs.Enrollment;

namespace LMS.Application.Interfaces.Services;

public interface IEnrollmentService
{
    Task<EnrollmentDto> EnrollAsync(Guid studentId, CreateEnrollmentDto dto);
    Task<IEnumerable<EnrollmentDto>> GetByUserAsync(Guid userId);
    Task<IEnumerable<EnrollmentDto>> GetByCourseAsync(Guid courseId);
    Task UpdateProgressAsync(Guid enrollmentId, Guid userId, int progress);
    Task DropAsync(Guid enrollmentId, Guid userId);
}
