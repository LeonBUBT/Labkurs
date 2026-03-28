using LMS.Domain.Enums;

namespace LMS.Application.DTOs.Quiz;

public record QuizDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public int PassingScore { get; init; }
    public Guid LessonId { get; init; }
}

public record QuizDetailDto : QuizDto
{
    public IEnumerable<QuizQuestionDto> Questions { get; init; } = [];
}

public record QuizQuestionDto
{
    public Guid Id { get; init; }
    public string Text { get; init; } = string.Empty;
    public QuestionType Type { get; init; }
    public int Points { get; init; }
    public IEnumerable<QuizAnswerDto> Answers { get; init; } = [];
}

/// <summary>Student-facing answer DTO — does NOT expose IsCorrect.</summary>
public record QuizAnswerDto
{
    public Guid Id { get; init; }
    public string Text { get; init; } = string.Empty;
}

public record QuizAttemptDto
{
    public Guid Id { get; init; }
    public Guid QuizId { get; init; }
    public int Score { get; init; }
    public bool IsPassed { get; init; }
    public DateTime AttemptedAt { get; init; }
}

public record CreateQuizDto
{
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public int PassingScore { get; init; } = 70;
}

public record CreateQuizQuestionDto
{
    public string Text { get; init; } = string.Empty;
    public QuestionType Type { get; init; }
    public int Points { get; init; } = 1;
    public IEnumerable<CreateQuizAnswerDto> Answers { get; init; } = [];
}

public record CreateQuizAnswerDto
{
    public string Text { get; init; } = string.Empty;
    public bool IsCorrect { get; init; }
}

public record SubmitQuizDto
{
    public IEnumerable<SubmitAnswerDto> Answers { get; init; } = [];
}

public record SubmitAnswerDto
{
    public Guid QuestionId { get; init; }
    public IEnumerable<Guid> SelectedAnswerIds { get; init; } = [];
}
