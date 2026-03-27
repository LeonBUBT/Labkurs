using AutoMapper;
using TUTORA.Application.DTOs.Category;
using TUTORA.Application.Interfaces.Services;
using TUTORA.Domain.Entities;
using TUTORA.Domain.Interfaces.Repositories;

namespace TUTORA.Application.Services;

public class CategoryService(IUnitOfWork uow, IMapper mapper) : ICategoryService
{
    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        var categories = await uow.Categories.GetAllAsync();
        return mapper.Map<IEnumerable<CategoryDto>>(categories);
    }

    public async Task<CategoryDto?> GetByIdAsync(Guid id)
    {
        var category = await uow.Categories.GetByIdAsync(id);
        return category == null ? null : mapper.Map<CategoryDto>(category);
    }

    public async Task<CategoryDto> CreateAsync(CreateCategoryDto dto)
    {
        var category = mapper.Map<CourseCategory>(dto);
        await uow.Categories.AddAsync(category);
        await uow.SaveChangesAsync();
        return mapper.Map<CategoryDto>(category);
    }

    public async Task<CategoryDto> UpdateAsync(Guid id, UpdateCategoryDto dto)
    {
        var category = await uow.Categories.GetByIdAsync(id)
                       ?? throw new KeyNotFoundException("Category not found.");
        mapper.Map(dto, category);
        category.UpdatedAt = DateTime.UtcNow;
        uow.Categories.Update(category);
        await uow.SaveChangesAsync();
        return mapper.Map<CategoryDto>(category);
    }

    public async Task DeleteAsync(Guid id)
    {
        var category = await uow.Categories.GetByIdAsync(id)
                       ?? throw new KeyNotFoundException("Category not found.");
        uow.Categories.Delete(category);
        await uow.SaveChangesAsync();
    }
}