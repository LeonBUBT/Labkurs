using AutoMapper;
using TUTORA.Application.DTOs.Enrollment;
using TUTORA.Application.Interfaces.Services;
using TUTORA.Domain.Entities;
using TUTORA.Domain.Enums;
using TUTORA.Domain.Interfaces.Repositories;

namespace TUTORA.Application.Services;

public class EnrollmentService(IUnitOfWork uow, IMapper mapper) : IEnrollmentService
{
    public async Task<EnrollmentDto> EnrollAsync(Guid studentId, CreateEnrollmentDto dto)
    {
        var existing = await uow.Enrollments.GetByStudentAndCourseAsync(studentId, dto.CourseId);
        if (existing != null)
            throw new InvalidOperationException("Already enrolled in this course.");

        var enrollment = new Enrollment
        {
            StudentId = studentId,
            CourseId = dto.CourseId
        };
        await uow.Enrollments.AddAsync(enrollment);
        await uow.SaveChangesAsync();
        var created = await uow.Enrollments.GetByIdWithDetailsAsync(enrollment.Id);
        return mapper.Map<EnrollmentDto>(created);
    }

    public async Task<IEnumerable<EnrollmentDto>> GetByUserAsync(Guid userId)
    {
        var enrollments = await uow.Enrollments.GetByStudentAsync(userId);
        return mapper.Map<IEnumerable<EnrollmentDto>>(enrollments);
    }

    public async Task<IEnumerable<EnrollmentDto>> GetByCourseAsync(Guid courseId)
    {
        var enrollments = await uow.Enrollments.GetByCourseAsync(courseId);
        return mapper.Map<IEnumerable<EnrollmentDto>>(enrollments);
    }

    public async Task UpdateProgressAsync(Guid enrollmentId, Guid userId, int progress)
    {
        var enrollment = await uow.Enrollments.GetByIdAsync(enrollmentId)
            ?? throw new KeyNotFoundException("Enrollment not found.");
        if (enrollment.StudentId != userId)
            throw new UnauthorizedAccessException("Not authorized.");

        enrollment.Progress = Math.Clamp(progress, 0, 100);

        if (enrollment.Progress == 100 && enrollment.Status == EnrollmentStatus.Active)
        {
            enrollment.Status = EnrollmentStatus.Completed;
            enrollment.CompletedAt = DateTime.UtcNow;

            var certificate = new Certificate
            {
                StudentId = userId,
                EnrollmentId = enrollmentId
            };
            await uow.Certificates.AddAsync(certificate);
        }

        uow.Enrollments.Update(enrollment);
        await uow.SaveChangesAsync();
    }

    public async Task DropAsync(Guid enrollmentId, Guid userId)
    {
        var enrollment = await uow.Enrollments.GetByIdAsync(enrollmentId)
            ?? throw new KeyNotFoundException("Enrollment not found.");
        if (enrollment.StudentId != userId)
            throw new UnauthorizedAccessException("Not authorized.");

        enrollment.Status = EnrollmentStatus.Dropped;
        uow.Enrollments.Update(enrollment);
        await uow.SaveChangesAsync();
    }
}
