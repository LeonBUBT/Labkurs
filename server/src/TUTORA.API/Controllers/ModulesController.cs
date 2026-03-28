using LMS.Application.DTOs.Common;
using LMS.Application.DTOs.Module;
using LMS.Application.Interfaces.Services;
using LMS.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[Route("api/courses/{courseId:guid}/modules")]
[Authorize]
public class ModulesController(IModuleService moduleService) : ApiControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<ModuleDto>>>> GetByCourse(Guid courseId)
    {
        var result = await moduleService.GetByCourseAsync(courseId);
        return Ok(ApiResponseDto<IEnumerable<ModuleDto>>.Ok(result));
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponseDto<ModuleDto>>> GetById(Guid courseId, Guid id)
    {
        var result = await moduleService.GetByIdAsync(id);
        if (result == null) return NotFound(ApiResponseDto<ModuleDto>.Fail("Module not found."));
        return Ok(ApiResponseDto<ModuleDto>.Ok(result));
    }

    [HttpPost]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<ModuleDto>>> Create(Guid courseId, [FromBody] CreateModuleDto dto)
    {
        var result = await moduleService.CreateAsync(courseId, dto);
        return CreatedAtAction(nameof(GetById), new { courseId, id = result.Id }, ApiResponseDto<ModuleDto>.Ok(result, "Module created."));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<ModuleDto>>> Update(Guid courseId, Guid id, [FromBody] UpdateModuleDto dto)
    {
        var result = await moduleService.UpdateAsync(id, dto);
        return Ok(ApiResponseDto<ModuleDto>.Ok(result, "Module updated."));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = Roles.InstructorOrAdmin)]
    public async Task<ActionResult<ApiResponseDto<object>>> Delete(Guid courseId, Guid id)
    {
        await moduleService.DeleteAsync(id);
        return Ok(ApiResponseDto<object>.Ok(null!, "Module deleted."));
    }
}
