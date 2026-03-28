using LMS.Application.DTOs.Common;
using LMS.Application.DTOs.Lesson;
using LMS.Application.Interfaces.Services;
using LMS.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[Route("api/modules/{moduleId:guid}/lessons")]
[Authorize]
public class LessonsController(ILessonService lessonService) : ApiControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<LessonDto>>>> GetByModule(Guid moduleId)
    {
        var result = await lessonService.GetByModuleAsync(moduleId);
        return Ok(ApiResponseDto<IEnumerable<LessonDto>>.Ok(result));
    }

    [HttpGet("{id:guid}")]
    [Authorize]
    public async Task<ActionResult<ApiResponseDto<LessonDto>>> GetById(Guid moduleId, Guid id)
    {
        var result = await lessonService.GetByIdAsync(id);
        if (result == null) return NotFound(ApiResponseDto<LessonDto>.Fail("Lesson not found."));
        return Ok(ApiResponseDto<LessonDto>.Ok(result));
    }

    [HttpPost]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<LessonDto>>> Create(Guid moduleId, [FromBody] CreateLessonDto dto)
    {
        var result = await lessonService.CreateAsync(moduleId, dto);
        return CreatedAtAction(nameof(GetById), new { moduleId, id = result.Id }, ApiResponseDto<LessonDto>.Ok(result, "Lesson created."));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<LessonDto>>> Update(Guid moduleId, Guid id, [FromBody] UpdateLessonDto dto)
    {
        var result = await lessonService.UpdateAsync(id, dto);
        return Ok(ApiResponseDto<LessonDto>.Ok(result, "Lesson updated."));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<object>>> Delete(Guid moduleId, Guid id)
    {
        await lessonService.DeleteAsync(id);
        return Ok(ApiResponseDto<object>.Ok(null!, "Lesson deleted."));
    }
}
