using LMS.Application.DTOs.Lesson;

namespace LMS.Application.Interfaces.Services;

public interface ILessonService
{
    Task<IEnumerable<LessonDto>> GetByModuleAsync(Guid moduleId);
    Task<LessonDto?> GetByIdAsync(Guid id);
    Task<LessonDto> CreateAsync(Guid moduleId, CreateLessonDto dto);
    Task<LessonDto> UpdateAsync(Guid id, UpdateLessonDto dto);
    Task DeleteAsync(Guid id);
}
