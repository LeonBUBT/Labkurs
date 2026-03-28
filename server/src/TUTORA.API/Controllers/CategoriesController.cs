using LMS.Application.DTOs.Category;
using LMS.Application.DTOs.Common;
using LMS.Application.Interfaces.Services;
using LMS.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[Route("api/[controller]")]
public class CategoriesController(ICategoryService categoryService) : ApiControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<CategoryDto>>>> GetAll()
    {
        var result = await categoryService.GetAllAsync();
        return Ok(ApiResponseDto<IEnumerable<CategoryDto>>.Ok(result));
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponseDto<CategoryDto>>> GetById(Guid id)
    {
        var result = await categoryService.GetByIdAsync(id);
        if (result == null) return NotFound(ApiResponseDto<CategoryDto>.Fail("Category not found."));
        return Ok(ApiResponseDto<CategoryDto>.Ok(result));
    }

    [HttpPost]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<ApiResponseDto<CategoryDto>>> Create([FromBody] CreateCategoryDto dto)
    {
        var result = await categoryService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, ApiResponseDto<CategoryDto>.Ok(result, "Category created."));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<ApiResponseDto<CategoryDto>>> Update(Guid id, [FromBody] UpdateCategoryDto dto)
    {
        var result = await categoryService.UpdateAsync(id, dto);
        return Ok(ApiResponseDto<CategoryDto>.Ok(result, "Category updated."));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<ApiResponseDto<object>>> Delete(Guid id)
    {
        await categoryService.DeleteAsync(id);
        return Ok(ApiResponseDto<object>.Ok(null!, "Category deleted."));
    }
}
