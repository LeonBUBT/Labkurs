using LMS.Domain.Entities;
using LMS.Domain.Interfaces.Repositories;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class EnrollmentRepository(ApplicationDbContext context)
    : GenericRepository<Enrollment>(context), IEnrollmentRepository
{
    public async Task<Enrollment?> GetByIdWithDetailsAsync(Guid id) =>
        await DbSet
            .AsNoTracking()
            .Include(e => e.Course)
            .Include(e => e.Student)
            .FirstOrDefaultAsync(e => e.Id == id);

    public async Task<IEnumerable<Enrollment>> GetByStudentAsync(Guid studentId) =>
        await DbSet
            .AsNoTracking()
            .Include(e => e.Course)
                .ThenInclude(c => c.Category)
            .Where(e => e.StudentId == studentId)
            .OrderByDescending(e => e.EnrolledAt)
            .ToListAsync();

    public async Task<IEnumerable<Enrollment>> GetByCourseAsync(Guid courseId) =>
        await DbSet
            .AsNoTracking()
            .Include(e => e.Student)
            .Where(e => e.CourseId == courseId)
            .OrderByDescending(e => e.EnrolledAt)
            .ToListAsync();

    public async Task<Enrollment?> GetByStudentAndCourseAsync(Guid studentId, Guid courseId) =>
        await DbSet
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);
}
