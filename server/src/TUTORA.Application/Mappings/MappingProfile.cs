using AutoMapper;
using LMS.Application.DTOs.Auth;
using LMS.Application.DTOs.Category;
using LMS.Application.DTOs.Certificate;
using LMS.Application.DTOs.Course;
using LMS.Application.DTOs.Enrollment;
using LMS.Application.DTOs.Lesson;
using LMS.Application.DTOs.Module;
using LMS.Application.DTOs.Quiz;
using LMS.Domain.Entities;
using LMS.Domain.Entities.Identity;
using ModuleDto = LMS.Application.DTOs.Module.ModuleDto;

namespace LMS.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Auth
        CreateMap<ApplicationUser, UserInfoDto>()
            .ForMember(d => d.FullName, o => o.MapFrom(s => s.FullName))
            .ForMember(d => d.Roles, o => o.Ignore());

        // Category
        CreateMap<CourseCategory, CategoryDto>();
        CreateMap<CreateCategoryDto, CourseCategory>();
        CreateMap<UpdateCategoryDto, CourseCategory>();

        // Course
        CreateMap<Course, CourseDto>()
            .ForMember(d => d.InstructorName, o => o.MapFrom(s => s.Instructor.FullName))
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category.Name))
            .ForMember(d => d.EnrollmentCount, o => o.MapFrom(s => s.Enrollments.Count));
        CreateMap<Course, CourseDetailDto>()
            .IncludeBase<Course, CourseDto>()
            .ForMember(d => d.Modules, o => o.MapFrom(s => s.Modules));
        CreateMap<Domain.Entities.Module, LMS.Application.DTOs.Course.ModuleDto>();
        CreateMap<Lesson, LessonSummaryDto>()
            .ForMember(d => d.Type, o => o.MapFrom(s => s.Type.ToString()));
        CreateMap<CreateCourseDto, Course>();
        CreateMap<UpdateCourseDto, Course>();

        // Module
        CreateMap<Domain.Entities.Module, ModuleDto>();
        CreateMap<CreateModuleDto, Domain.Entities.Module>();
        CreateMap<UpdateModuleDto, Domain.Entities.Module>();

        // Lesson
        CreateMap<Lesson, LessonDto>();
        CreateMap<CreateLessonDto, Lesson>();
        CreateMap<UpdateLessonDto, Lesson>();

        // Enrollment
        CreateMap<Enrollment, EnrollmentDto>()
            .ForMember(d => d.CourseTitle, o => o.MapFrom(s => s.Course.Title));

        // Quiz
        CreateMap<Quiz, QuizDto>();
        CreateMap<Quiz, QuizDetailDto>();
        CreateMap<QuizQuestion, QuizQuestionDto>();
        CreateMap<QuizAnswer, QuizAnswerDto>();
        CreateMap<QuizAttempt, QuizAttemptDto>();
        CreateMap<CreateQuizDto, Quiz>();
        CreateMap<CreateQuizQuestionDto, QuizQuestion>();
        CreateMap<CreateQuizAnswerDto, QuizAnswer>();

        // Certificate
        CreateMap<Certificate, CertificateDto>()
            .ForMember(d => d.StudentName, o => o.MapFrom(s => s.Student.FullName))
            .ForMember(d => d.CourseTitle, o => o.MapFrom(s => s.Enrollment.Course.Title));
    }
}
