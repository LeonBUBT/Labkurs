using LMS.Domain.Entities;

namespace LMS.Domain.Interfaces.Repositories;

public interface IQuizRepository : IGenericRepository<Quiz>
{
    Task<Quiz?> GetByIdWithQuestionsAsync(Guid id);
    Task<IEnumerable<Quiz>> GetByLessonAsync(Guid lessonId);
}
