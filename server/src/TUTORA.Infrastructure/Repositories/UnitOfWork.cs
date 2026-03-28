using LMS.Domain.Entities;
using LMS.Domain.Interfaces.Repositories;
using LMS.Infrastructure.Data;

namespace LMS.Infrastructure.Repositories;

public class UnitOfWork(
    ApplicationDbContext context,
    ICourseRepository courses,
    IEnrollmentRepository enrollments,
    IQuizRepository quizzes,
    IRefreshTokenRepository refreshTokens,
    IGenericRepository<CourseCategory> categories,
    IGenericRepository<LMS.Domain.Entities.Module> modules,
    IGenericRepository<Lesson> lessons,
    IGenericRepository<QuizQuestion> quizQuestions,
    IGenericRepository<QuizAnswer> quizAnswers,
    IGenericRepository<QuizAttempt> quizAttempts,
    IGenericRepository<Certificate> certificates) : IUnitOfWork
{
    public ICourseRepository Courses { get; } = courses;
    public IEnrollmentRepository Enrollments { get; } = enrollments;
    public IQuizRepository Quizzes { get; } = quizzes;
    public IRefreshTokenRepository RefreshTokens { get; } = refreshTokens;
    public IGenericRepository<CourseCategory> Categories { get; } = categories;
    public IGenericRepository<LMS.Domain.Entities.Module> Modules { get; } = modules;
    public IGenericRepository<Lesson> Lessons { get; } = lessons;
    public IGenericRepository<QuizQuestion> QuizQuestions { get; } = quizQuestions;
    public IGenericRepository<QuizAnswer> QuizAnswers { get; } = quizAnswers;
    public IGenericRepository<QuizAttempt> QuizAttempts { get; } = quizAttempts;
    public IGenericRepository<Certificate> Certificates { get; } = certificates;

    public async Task<int> SaveChangesAsync() => await context.SaveChangesAsync();

    public void Dispose() => GC.SuppressFinalize(this);
}
