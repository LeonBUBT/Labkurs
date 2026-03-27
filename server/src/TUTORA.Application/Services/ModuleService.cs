using AutoMapper;
using TUTORA.Application.DTOs.Module;
using TUTORA.Application.Interfaces.Services;
using TUTORA.Domain.Interfaces.Repositories;

namespace TUTORA.Application.Services;

public class ModuleService(IUnitOfWork uow, IMapper mapper) : IModuleService
{
    public async Task<IEnumerable<ModuleDto>> GetByCourseAsync(Guid courseId)
    {
        var modules = await uow.Modules.FindAsync(m => m.CourseId == courseId);
        return mapper.Map<IEnumerable<ModuleDto>>(modules.OrderBy(m => m.Order));
    }

    public async Task<ModuleDto?> GetByIdAsync(Guid id)
    {
        var module = await uow.Modules.GetByIdAsync(id);
        return module == null ? null : mapper.Map<ModuleDto>(module);
    }

    public async Task<ModuleDto> CreateAsync(Guid courseId, CreateModuleDto dto)
    {
        var module = mapper.Map<Domain.Entities.Module>(dto);
        module.CourseId = courseId;
        await uow.Modules.AddAsync(module);
        await uow.SaveChangesAsync();
        return mapper.Map<ModuleDto>(module);
    }

    public async Task<ModuleDto> UpdateAsync(Guid id, UpdateModuleDto dto)
    {
        var module = await uow.Modules.GetByIdAsync(id)
                     ?? throw new KeyNotFoundException("Module not found.");
        mapper.Map(dto, module);
        uow.Modules.Update(module);
        await uow.SaveChangesAsync();
        return mapper.Map<ModuleDto>(module);
    }

    public async Task DeleteAsync(Guid id)
    {
        var module = await uow.Modules.GetByIdAsync(id)
                     ?? throw new KeyNotFoundException("Module not found.");
        uow.Modules.Delete(module);
        await uow.SaveChangesAsync();
    }
}