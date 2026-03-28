using LMS.Application.DTOs.Quiz;

namespace LMS.Application.Interfaces.Services;

public interface IQuizService
{
    Task<IEnumerable<QuizDto>> GetByLessonAsync(Guid lessonId);
    Task<QuizDetailDto?> GetByIdAsync(Guid id);
    Task<QuizDto> CreateAsync(Guid lessonId, CreateQuizDto dto);
    Task DeleteAsync(Guid id);
    Task<Guid> AddQuestionAsync(Guid quizId, CreateQuizQuestionDto dto);
    Task<QuizAttemptDto> SubmitAttemptAsync(Guid quizId, Guid userId, SubmitQuizDto dto);
    Task<IEnumerable<QuizAttemptDto>> GetAttemptsByUserAsync(Guid quizId, Guid userId);
}
