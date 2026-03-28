using LMS.Domain.Entities;
using LMS.Domain.Enums;
using LMS.Domain.Interfaces.Repositories;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class CourseRepository(ApplicationDbContext context)
    : GenericRepository<Course>(context), ICourseRepository
{
    public async Task<Course?> GetByIdWithDetailsAsync(Guid id) =>
        await DbSet
            .AsNoTracking()
            .Include(c => c.Instructor)
            .Include(c => c.Category)
            .Include(c => c.Modules.OrderBy(m => m.Order))
                .ThenInclude(m => m.Lessons.OrderBy(l => l.Order))
            .Include(c => c.Enrollments)
            .FirstOrDefaultAsync(c => c.Id == id);

    public async Task<IEnumerable<Course>> GetByInstructorAsync(Guid instructorId) =>
        await DbSet
            .AsNoTracking()
            .Include(c => c.Category)
            .Include(c => c.Enrollments)
            .Where(c => c.InstructorId == instructorId)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

    public async Task<(IEnumerable<Course> Items, int Total)> GetPublishedPagedAsync(
        string? search, Guid? categoryId, int page, int pageSize)
    {
        var query = DbSet
            .AsNoTracking()
            .Include(c => c.Instructor)
            .Include(c => c.Category)
            .Include(c => c.Enrollments)
            .Where(c => c.Status == CourseStatus.Published);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(c => c.Title.Contains(search) || c.Description.Contains(search));

        if (categoryId.HasValue)
            query = query.Where(c => c.CategoryId == categoryId);

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(c => c.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }

    public async Task<IEnumerable<Course>> GetAllWithDetailsAsync() =>
        await DbSet
            .AsNoTracking()
            .Include(c => c.Instructor)
            .Include(c => c.Category)
            .Include(c => c.Enrollments)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
}
