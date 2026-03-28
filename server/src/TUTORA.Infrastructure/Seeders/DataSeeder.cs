using LMS.Domain.Common;
using LMS.Domain.Entities;
using LMS.Domain.Entities.Identity;
using LMS.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LMS.Infrastructure.Seeders;

public static class DataSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();

        await context.Database.MigrateAsync();

        // Seed roles
        foreach (var roleName in new[] { Roles.Admin, Roles.Instructor, Roles.Student })
        {
            if (!await roleManager.RoleExistsAsync(roleName))
                await roleManager.CreateAsync(new ApplicationRole { Name = roleName });
        }

        // Seed admin user
        var adminEmail = config["SeedData:AdminEmail"] ?? "admin@lms.com";
        var adminPassword = config["SeedData:AdminPassword"] ?? "Admin@12345";

        if (await userManager.FindByEmailAsync(adminEmail) == null)
        {
            var admin = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FirstName = "Admin",
                LastName = "User",
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(admin, adminPassword);
            if (result.Succeeded)
                await userManager.AddToRoleAsync(admin, Roles.Admin);
        }

        // Seed categories
        if (!await context.CourseCategories.AnyAsync())
        {
            context.CourseCategories.AddRange(
                new CourseCategory { Name = "Programming", Description = "Software development and coding" },
                new CourseCategory { Name = "Design", Description = "UI/UX and graphic design" },
                new CourseCategory { Name = "Business", Description = "Business and entrepreneurship" },
                new CourseCategory { Name = "Marketing", Description = "Digital marketing and SEO" },
                new CourseCategory { Name = "Science", Description = "Natural and applied sciences" }
            );
            await context.SaveChangesAsync();
        }
    }
}
