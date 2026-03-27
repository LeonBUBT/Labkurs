using AutoMapper;
using TUTORA.Application.DTOs.Lesson;
using TUTORA.Application.Interfaces.Services;
using TUTORA.Domain.Entities;
using TUTORA.Domain.Interfaces.Repositories;

namespace TUTORA.Application.Services;

public class LessonService(IUnitOfWork uow, IMapper mapper) : ILessonService
{
    public async Task<IEnumerable<LessonDto>> GetByModuleAsync(Guid moduleId)
    {
        var lessons = await uow.Lessons.FindAsync(l => l.ModuleId == moduleId);
        return mapper.Map<IEnumerable<LessonDto>>(lessons.OrderBy(l => l.Order));
    }

    public async Task<LessonDto?> GetByIdAsync(Guid id)
    {
        var lesson = await uow.Lessons.GetByIdAsync(id);
        return lesson == null ? null : mapper.Map<LessonDto>(lesson);
    }

    public async Task<LessonDto> CreateAsync(Guid moduleId, CreateLessonDto dto)
    {
        var lesson = mapper.Map<Lesson>(dto);
        lesson.ModuleId = moduleId;
        await uow.Lessons.AddAsync(lesson);
        await uow.SaveChangesAsync();
        return mapper.Map<LessonDto>(lesson);
    }

    public async Task<LessonDto> UpdateAsync(Guid id, UpdateLessonDto dto)
    {
        var lesson = await uow.Lessons.GetByIdAsync(id)
                     ?? throw new KeyNotFoundException("Lesson not found.");
        mapper.Map(dto, lesson);
        lesson.UpdatedAt = DateTime.UtcNow;
        uow.Lessons.Update(lesson);
        await uow.SaveChangesAsync();
        return mapper.Map<LessonDto>(lesson);
    }

    public async Task DeleteAsync(Guid id)
    {
        var lesson = await uow.Lessons.GetByIdAsync(id)
                     ?? throw new KeyNotFoundException("Lesson not found.");
        uow.Lessons.Delete(lesson);
        await uow.SaveChangesAsync();
    }
}