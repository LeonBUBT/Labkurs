using TUTORA.Domain.Entities;

namespace TUTORA.Domain.Interfaces.Repositories;

public interface IEnrollmentRepository : IGenericRepository<Enrollment>
{
    Task<Enrollment?> GetByIdWithDetailsAsync(Guid id);
    Task<IEnumerable<Enrollment>> GetByStudentAsync(Guid studentId);
    Task<IEnumerable<Enrollment>> GetByCourseAsync(Guid courseId);
    Task<Enrollment?> GetByStudentAndCourseAsync(Guid studentId, Guid courseId);
}