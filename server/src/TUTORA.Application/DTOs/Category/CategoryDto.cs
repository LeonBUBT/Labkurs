namespace LMS.Application.DTOs.Category;

public record CategoryDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
}

public record CreateCategoryDto
{
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
}

public record UpdateCategoryDto
{
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
}
