using LMS.Application.DTOs.Common;
using LMS.Application.DTOs.Course;
using LMS.Application.Interfaces.Services;
using LMS.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[Route("api/[controller]")]
public class CoursesController(ICourseService courseService) : ApiControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponseDto<PagedResultDto<CourseDto>>>> GetAll(
        [FromQuery] string? search, [FromQuery] Guid? categoryId,
        [FromQuery] int page = 1, [FromQuery] int pageSize = 12)
    {
        var result = await courseService.GetPublishedCoursesAsync(search, categoryId, page, pageSize);
        return Ok(ApiResponseDto<PagedResultDto<CourseDto>>.Ok(result));
    }

    [HttpGet("admin")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<CourseDto>>>> GetAllAdmin()
    {
        var result = await courseService.GetAllForAdminAsync();
        return Ok(ApiResponseDto<IEnumerable<CourseDto>>.Ok(result));
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponseDto<CourseDetailDto>>> GetById(Guid id)
    {
        var result = await courseService.GetByIdAsync(id);
        if (result == null) return NotFound(ApiResponseDto<CourseDetailDto>.Fail("Course not found."));
        return Ok(ApiResponseDto<CourseDetailDto>.Ok(result));
    }

    [HttpGet("instructor")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<CourseDto>>>> GetByInstructor()
    {
        var result = await courseService.GetByInstructorAsync(CurrentUserId);
        return Ok(ApiResponseDto<IEnumerable<CourseDto>>.Ok(result));
    }

    [HttpPost]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<CourseDto>>> Create([FromBody] CreateCourseDto dto)
    {
        var result = await courseService.CreateAsync(CurrentUserId, dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, ApiResponseDto<CourseDto>.Ok(result, "Course created."));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<CourseDto>>> Update(Guid id, [FromBody] UpdateCourseDto dto)
    {
        var result = await courseService.UpdateAsync(id, CurrentUserId, dto, IsAdmin);
        return Ok(ApiResponseDto<CourseDto>.Ok(result, "Course updated."));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<object>>> Delete(Guid id)
    {
        await courseService.DeleteAsync(id, CurrentUserId, IsAdmin);
        return Ok(ApiResponseDto<object>.Ok(null!, "Course deleted."));
    }

    [HttpPost("{id:guid}/publish")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<CourseDto>>> Publish(Guid id)
    {
        var result = await courseService.PublishAsync(id, CurrentUserId, IsAdmin);
        return Ok(ApiResponseDto<CourseDto>.Ok(result, "Course published."));
    }
}
