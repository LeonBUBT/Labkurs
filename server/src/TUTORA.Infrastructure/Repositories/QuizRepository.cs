using LMS.Domain.Entities;
using LMS.Domain.Interfaces.Repositories;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class QuizRepository(ApplicationDbContext context)
    : GenericRepository<Quiz>(context), IQuizRepository
{
    public async Task<Quiz?> GetByIdWithQuestionsAsync(Guid id) =>
        await DbSet
            .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == id);

    public async Task<IEnumerable<Quiz>> GetByLessonAsync(Guid lessonId) =>
        await DbSet
            .Where(q => q.LessonId == lessonId)
            .ToListAsync();
}
