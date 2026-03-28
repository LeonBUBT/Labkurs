namespace LMS.Application.DTOs.Module;

public record ModuleDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public int Order { get; init; }
    public Guid CourseId { get; init; }
}

public record CreateModuleDto
{
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public int Order { get; init; }
}

public record UpdateModuleDto
{
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public int Order { get; init; }
}
