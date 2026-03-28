using LMS.Domain.Entities;
using LMS.Domain.Entities.Identity;

namespace LMS.Domain.Interfaces.Repositories;

public interface IUnitOfWork : IDisposable
{
    ICourseRepository Courses { get; }
    IEnrollmentRepository Enrollments { get; }
    IQuizRepository Quizzes { get; }
    IRefreshTokenRepository RefreshTokens { get; }

    IGenericRepository<CourseCategory> Categories { get; }
    IGenericRepository<LMS.Domain.Entities.Module> Modules { get; }
    IGenericRepository<Lesson> Lessons { get; }
    IGenericRepository<QuizQuestion> QuizQuestions { get; }
    IGenericRepository<QuizAnswer> QuizAnswers { get; }
    IGenericRepository<QuizAttempt> QuizAttempts { get; }
    IGenericRepository<Certificate> Certificates { get; }

    Task<int> SaveChangesAsync();
}
