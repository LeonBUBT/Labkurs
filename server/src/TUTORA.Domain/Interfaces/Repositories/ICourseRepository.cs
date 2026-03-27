using TUTORA.Domain.Entities;

namespace TUTORA.Domain.Interfaces.Repositories;

public interface ICourseRepository : IGenericRepository<Course>
{
    Task<Course?> GetByIdWithDetailsAsync(Guid id);
    Task<IEnumerable<Course>> GetByInstructorAsync(Guid instructorId);
    Task<(IEnumerable<Course> Items, int Total)> GetPublishedPagedAsync(string? search, Guid? categoryId, int page, int pageSize);
    Task<IEnumerable<Course>> GetAllWithDetailsAsync();
}