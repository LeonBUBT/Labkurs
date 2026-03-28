using LMS.Application.DTOs.Common;
using LMS.Application.DTOs.Enrollment;
using LMS.Application.Interfaces.Services;
using LMS.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[Route("api/[controller]")]
[Authorize]
public class EnrollmentsController(IEnrollmentService enrollmentService) : ApiControllerBase
{
    [HttpPost]
    [Authorize(Roles = Roles.Student)]
    public async Task<ActionResult<ApiResponseDto<EnrollmentDto>>> Enroll([FromBody] CreateEnrollmentDto dto)
    {
        var result = await enrollmentService.EnrollAsync(CurrentUserId, dto);
        return Ok(ApiResponseDto<EnrollmentDto>.Ok(result, "Enrolled successfully."));
    }

    [HttpGet("my")]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<EnrollmentDto>>>> GetMyEnrollments()
    {
        var result = await enrollmentService.GetByUserAsync(CurrentUserId);
        return Ok(ApiResponseDto<IEnumerable<EnrollmentDto>>.Ok(result));
    }

    [HttpGet("course/{courseId:guid}")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<EnrollmentDto>>>> GetByCourse(Guid courseId)
    {
        var result = await enrollmentService.GetByCourseAsync(courseId);
        return Ok(ApiResponseDto<IEnumerable<EnrollmentDto>>.Ok(result));
    }

    [HttpPatch("{id:guid}/progress")]
    public async Task<ActionResult<ApiResponseDto<object>>> UpdateProgress(Guid id, [FromBody] UpdateProgressDto dto)
    {
        await enrollmentService.UpdateProgressAsync(id, CurrentUserId, dto.Progress);
        return Ok(ApiResponseDto<object>.Ok(null!, "Progress updated."));
    }

    [HttpPost("{id:guid}/drop")]
    public async Task<ActionResult<ApiResponseDto<object>>> Drop(Guid id)
    {
        await enrollmentService.DropAsync(id, CurrentUserId);
        return Ok(ApiResponseDto<object>.Ok(null!, "Enrollment dropped."));
    }
}
