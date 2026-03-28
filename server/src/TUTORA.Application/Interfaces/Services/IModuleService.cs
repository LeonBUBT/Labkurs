using LMS.Application.DTOs.Module;

namespace LMS.Application.Interfaces.Services;

public interface IModuleService
{
    Task<IEnumerable<ModuleDto>> GetByCourseAsync(Guid courseId);
    Task<ModuleDto?> GetByIdAsync(Guid id);
    Task<ModuleDto> CreateAsync(Guid courseId, CreateModuleDto dto);
    Task<ModuleDto> UpdateAsync(Guid id, UpdateModuleDto dto);
    Task DeleteAsync(Guid id);
}
