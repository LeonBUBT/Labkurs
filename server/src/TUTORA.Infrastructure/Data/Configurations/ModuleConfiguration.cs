using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LMS.Infrastructure.Data.Configurations;

public class ModuleConfiguration : IEntityTypeConfiguration<LMS.Domain.Entities.Module>
{
    public void Configure(EntityTypeBuilder<LMS.Domain.Entities.Module> builder)
    {
        builder.HasKey(m => m.Id);
        builder.Property(m => m.Title).IsRequired().HasMaxLength(200);

        builder.HasOne(m => m.Course)
            .WithMany(c => c.Modules)
            .HasForeignKey(m => m.CourseId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
