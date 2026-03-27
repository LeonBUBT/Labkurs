using AutoMapper;
using TUTORA.Application.DTOs.Quiz;
using TUTORA.Application.Interfaces.Services;
using TUTORA.Domain.Entities;
using TUTORA.Domain.Interfaces.Repositories;

namespace TUTORA.Application.Services;

public class QuizService(IUnitOfWork uow, IMapper mapper) : IQuizService
{
    public async Task<IEnumerable<QuizDto>> GetByLessonAsync(Guid lessonId)
    {
        var quizzes = await uow.Quizzes.GetByLessonAsync(lessonId);
        return mapper.Map<IEnumerable<QuizDto>>(quizzes);
    }

    public async Task<QuizDetailDto?> GetByIdAsync(Guid id)
    {
        var quiz = await uow.Quizzes.GetByIdWithQuestionsAsync(id);
        return quiz == null ? null : mapper.Map<QuizDetailDto>(quiz);
    }

    public async Task<QuizDto> CreateAsync(Guid lessonId, CreateQuizDto dto)
    {
        var quiz = mapper.Map<Quiz>(dto);
        quiz.LessonId = lessonId;
        await uow.Quizzes.AddAsync(quiz);
        await uow.SaveChangesAsync();
        return mapper.Map<QuizDto>(quiz);
    }

    public async Task DeleteAsync(Guid id)
    {
        var quiz = await uow.Quizzes.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Quiz not found.");
        uow.Quizzes.Delete(quiz);
        await uow.SaveChangesAsync();
    }

    public async Task<Guid> AddQuestionAsync(Guid quizId, CreateQuizQuestionDto dto)
    {
        var question = mapper.Map<QuizQuestion>(dto);
        question.QuizId = quizId;
        foreach (var answer in question.Answers)
            answer.QuestionId = question.Id;
        await uow.QuizQuestions.AddAsync(question);
        await uow.SaveChangesAsync();
        return question.Id;
    }

    public async Task<QuizAttemptDto> SubmitAttemptAsync(Guid quizId, Guid userId, SubmitQuizDto dto)
    {
        var quiz = await uow.Quizzes.GetByIdWithQuestionsAsync(quizId)
            ?? throw new KeyNotFoundException("Quiz not found.");

        int totalPoints = quiz.Questions.Sum(q => q.Points);
        int earnedPoints = 0;

        foreach (var answer in dto.Answers)
        {
            var question = quiz.Questions.FirstOrDefault(q => q.Id == answer.QuestionId);
            if (question == null) continue;

            var correctIds = question.Answers.Where(a => a.IsCorrect).Select(a => a.Id).ToHashSet();
            var selectedIds = answer.SelectedAnswerIds.ToHashSet();

            if (correctIds.SetEquals(selectedIds))
                earnedPoints += question.Points;
        }

        int score = totalPoints > 0 ? (int)((double)earnedPoints / totalPoints * 100) : 0;

        var attempt = new QuizAttempt
        {
            QuizId = quizId,
            StudentId = userId,
            Score = score,
            IsPassed = score >= quiz.PassingScore
        };
        await uow.QuizAttempts.AddAsync(attempt);
        await uow.SaveChangesAsync();
        return mapper.Map<QuizAttemptDto>(attempt);
    }

    public async Task<IEnumerable<QuizAttemptDto>> GetAttemptsByUserAsync(Guid quizId, Guid userId)
    {
        var attempts = await uow.QuizAttempts.FindAsync(a => a.QuizId == quizId && a.StudentId == userId);
        return mapper.Map<IEnumerable<QuizAttemptDto>>(attempts.OrderByDescending(a => a.AttemptedAt));
    }
}
