using LMS.Application.DTOs.Auth;
using LMS.Application.DTOs.Common;
using LMS.Domain.Common;
using LMS.Domain.Entities.Identity;
using LMS.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Controllers;

[Route("api/[controller]")]
[Authorize(Roles = Roles.Admin)]
public class UsersController(UserManager<ApplicationUser> userManager) : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<UserInfoDto>>>> GetAll()
    {
        var users = await userManager.Users.ToListAsync();
        var result = new List<UserInfoDto>();
        foreach (var u in users)
        {
            var roles = await userManager.GetRolesAsync(u);
            result.Add(new UserInfoDto { Id = u.Id, FullName = u.FullName, Email = u.Email!, Roles = roles });
        }
        return Ok(ApiResponseDto<IEnumerable<UserInfoDto>>.Ok(result));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponseDto<UserInfoDto>>> GetById(Guid id)
    {
        var user = await userManager.FindByIdAsync(id.ToString());
        if (user == null) return NotFound(ApiResponseDto<UserInfoDto>.Fail("User not found."));
        var roles = await userManager.GetRolesAsync(user);
        return Ok(ApiResponseDto<UserInfoDto>.Ok(new UserInfoDto { Id = user.Id, FullName = user.FullName, Email = user.Email!, Roles = roles }));
    }

    [HttpPost("{id:guid}/activate")]
    public async Task<ActionResult<ApiResponseDto<object>>> Activate(Guid id)
    {
        var user = await userManager.FindByIdAsync(id.ToString());
        if (user == null) return NotFound(ApiResponseDto<object>.Fail("User not found."));
        user.Status = UserStatus.Active;
        await userManager.UpdateAsync(user);
        return Ok(ApiResponseDto<object>.Ok(null!, "User activated."));
    }

    [HttpPost("{id:guid}/deactivate")]
    public async Task<ActionResult<ApiResponseDto<object>>> Deactivate(Guid id)
    {
        var user = await userManager.FindByIdAsync(id.ToString());
        if (user == null) return NotFound(ApiResponseDto<object>.Fail("User not found."));
        user.Status = UserStatus.Inactive;
        await userManager.UpdateAsync(user);
        return Ok(ApiResponseDto<object>.Ok(null!, "User deactivated."));
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponseDto<object>>> Delete(Guid id)
    {
        var user = await userManager.FindByIdAsync(id.ToString());
        if (user == null) return NotFound(ApiResponseDto<object>.Fail("User not found."));
        await userManager.DeleteAsync(user);
        return Ok(ApiResponseDto<object>.Ok(null!, "User deleted."));
    }

    [HttpPost("{id:guid}/roles")]
    public async Task<ActionResult<ApiResponseDto<object>>> AssignRole(Guid id, [FromBody] string role)
    {
        var user = await userManager.FindByIdAsync(id.ToString());
        if (user == null) return NotFound(ApiResponseDto<object>.Fail("User not found."));
        await userManager.AddToRoleAsync(user, role);
        return Ok(ApiResponseDto<object>.Ok(null!, "Role assigned."));
    }
}
