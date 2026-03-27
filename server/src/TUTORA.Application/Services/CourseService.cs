using AutoMapper;
using TUTORA.Application.DTOs.Common;
using TUTORA.Application.DTOs.Course;
using TUTORA.Application.Interfaces.Services;
using TUTORA.Domain.Entities;
using TUTORA.Domain.Enums;
using TUTORA.Domain.Interfaces.Repositories;

namespace TUTORA.Application.Services;

public class CourseService(IUnitOfWork uow, IMapper mapper) : ICourseService
{
    public async Task<PagedResultDto<CourseDto>> GetPublishedCoursesAsync(string? search, Guid? categoryId, int page, int pageSize)
    {
        var (items, total) = await uow.Courses.GetPublishedPagedAsync(search, categoryId, page, pageSize);
        return new PagedResultDto<CourseDto>
        {
            Items = mapper.Map<IEnumerable<CourseDto>>(items),
            Total = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<CourseDetailDto?> GetByIdAsync(Guid id)
    {
        var course = await uow.Courses.GetByIdWithDetailsAsync(id);
        return course == null ? null : mapper.Map<CourseDetailDto>(course);
    }

    public async Task<IEnumerable<CourseDto>> GetByInstructorAsync(Guid instructorId)
    {
        var courses = await uow.Courses.GetByInstructorAsync(instructorId);
        return mapper.Map<IEnumerable<CourseDto>>(courses);
    }

    public async Task<IEnumerable<CourseDto>> GetAllForAdminAsync()
    {
        var courses = await uow.Courses.GetAllWithDetailsAsync();
        return mapper.Map<IEnumerable<CourseDto>>(courses);
    }

    public async Task<CourseDto> CreateAsync(Guid instructorId, CreateCourseDto dto)
    {
        var course = mapper.Map<Course>(dto);
        course.InstructorId = instructorId;
        await uow.Courses.AddAsync(course);
        await uow.SaveChangesAsync();
        var created = await uow.Courses.GetByIdWithDetailsAsync(course.Id);
        return mapper.Map<CourseDto>(created);
    }

    public async Task<CourseDto> UpdateAsync(Guid id, Guid instructorId, UpdateCourseDto dto, bool isAdmin = false)
    {
        var course = await uow.Courses.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Course not found.");
        if (course.InstructorId != instructorId && !isAdmin)
            throw new UnauthorizedAccessException("Not authorized to update this course.");
        mapper.Map(dto, course);
        uow.Courses.Update(course);
        await uow.SaveChangesAsync();
        var updated = await uow.Courses.GetByIdWithDetailsAsync(course.Id);
        return mapper.Map<CourseDto>(updated);
    }

    public async Task DeleteAsync(Guid id, Guid instructorId, bool isAdmin = false)
    {
        var course = await uow.Courses.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Course not found.");
        if (course.InstructorId != instructorId && !isAdmin)
            throw new UnauthorizedAccessException("Not authorized to delete this course.");
        uow.Courses.Delete(course);
        await uow.SaveChangesAsync();
    }

    public async Task<CourseDto> PublishAsync(Guid id, Guid instructorId, bool isAdmin = false)
    {
        var course = await uow.Courses.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Course not found.");
        if (course.InstructorId != instructorId && !isAdmin)
            throw new UnauthorizedAccessException("Not authorized to publish this course.");
        course.Status = CourseStatus.Published;
        uow.Courses.Update(course);
        await uow.SaveChangesAsync();
        var published = await uow.Courses.GetByIdWithDetailsAsync(course.Id);
        return mapper.Map<CourseDto>(published);
    }
}
