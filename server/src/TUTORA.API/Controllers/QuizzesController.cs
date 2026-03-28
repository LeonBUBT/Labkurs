using LMS.Application.DTOs.Common;
using LMS.Application.DTOs.Quiz;
using LMS.Application.Interfaces.Services;
using LMS.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[Route("api/lessons/{lessonId:guid}/quizzes")]
[Authorize]
public class QuizzesController(IQuizService quizService) : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<QuizDto>>>> GetByLesson(Guid lessonId)
    {
        var result = await quizService.GetByLessonAsync(lessonId);
        return Ok(ApiResponseDto<IEnumerable<QuizDto>>.Ok(result));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponseDto<QuizDetailDto>>> GetById(Guid lessonId, Guid id)
    {
        var result = await quizService.GetByIdAsync(id);
        if (result == null) return NotFound(ApiResponseDto<QuizDetailDto>.Fail("Quiz not found."));
        return Ok(ApiResponseDto<QuizDetailDto>.Ok(result));
    }

    [HttpPost]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<QuizDto>>> Create(Guid lessonId, [FromBody] CreateQuizDto dto)
    {
        var result = await quizService.CreateAsync(lessonId, dto);
        return CreatedAtAction(nameof(GetById), new { lessonId, id = result.Id }, ApiResponseDto<QuizDto>.Ok(result, "Quiz created."));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<object>>> Delete(Guid lessonId, Guid id)
    {
        await quizService.DeleteAsync(id);
        return Ok(ApiResponseDto<object>.Ok(null!, "Quiz deleted."));
    }

    [HttpPost("{id:guid}/questions")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<object>>> AddQuestion(Guid lessonId, Guid id, [FromBody] CreateQuizQuestionDto dto)
    {
        var questionId = await quizService.AddQuestionAsync(id, dto);
        return Ok(ApiResponseDto<object>.Ok(questionId, "Question added."));
    }

    [HttpPost("{id:guid}/attempt")]
    [Authorize(Roles = Roles.Student)]
    public async Task<ActionResult<ApiResponseDto<QuizAttemptDto>>> SubmitAttempt(Guid lessonId, Guid id, [FromBody] SubmitQuizDto dto)
    {
        var result = await quizService.SubmitAttemptAsync(id, CurrentUserId, dto);
        return Ok(ApiResponseDto<QuizAttemptDto>.Ok(result, "Quiz submitted."));
    }

    [HttpGet("{id:guid}/attempts")]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<QuizAttemptDto>>>> GetAttempts(Guid lessonId, Guid id)
    {
        var result = await quizService.GetAttemptsByUserAsync(id, CurrentUserId);
        return Ok(ApiResponseDto<IEnumerable<QuizAttemptDto>>.Ok(result));
    }
}
