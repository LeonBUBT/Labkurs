using TUTORA.Application.DTOs.Auth;
using TUTORA.Application.Interfaces.Services;
using TUTORA.Application.Settings;
using TUTORA.Domain.Common;
using TUTORA.Domain.Entities.Identity;
using TUTORA.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace TUTORA.Application.Services;

public class AuthService(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    ITokenService tokenService,
    IUnitOfWork uow,
    IOptions<JwtSettings> jwtOptions) : IAuthService
{
    private readonly JwtSettings _jwt = jwtOptions.Value;

    public async Task<LoginResponseDto> RegisterAsync(RegisterRequestDto dto)
    {
        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            PhoneNumber = dto.PhoneNumber,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
            throw new InvalidOperationException(string.Join("; ", result.Errors.Select(e => e.Description)));

        var role = dto.Role is Roles.Student or Roles.Instructor ? dto.Role : Roles.Student;
        await userManager.AddToRoleAsync(user, role);
        return await BuildLoginResponse(user);
    }

    public async Task<LoginResponseDto> LoginAsync(LoginRequestDto dto)
    {
        var user = await userManager.FindByEmailAsync(dto.Email)
            ?? throw new UnauthorizedAccessException("Invalid credentials.");

        var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, lockoutOnFailure: true);
        if (!result.Succeeded)
            throw new UnauthorizedAccessException("Invalid credentials.");

        return await BuildLoginResponse(user);
    }

    public async Task<LoginResponseDto> RefreshTokenAsync(RefreshTokenRequestDto dto)
    {
        var principal = tokenService.GetPrincipalFromExpiredToken(dto.AccessToken);
        var userId = Guid.Parse(principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
            ?? principal.FindFirst("sub")?.Value
            ?? throw new UnauthorizedAccessException("Invalid token."));

        var storedToken = await uow.RefreshTokens.GetActiveTokenAsync(dto.RefreshToken)
            ?? throw new UnauthorizedAccessException("Invalid or expired refresh token.");

        if (storedToken.UserId != userId)
            throw new UnauthorizedAccessException("Token does not belong to user.");

        storedToken.Revoked = DateTime.UtcNow;
        await uow.SaveChangesAsync();

        var user = await userManager.FindByIdAsync(userId.ToString())
            ?? throw new UnauthorizedAccessException("User not found.");

        return await BuildLoginResponse(user);
    }

    public async Task RevokeTokenAsync(string refreshToken, Guid userId)
    {
        var storedToken = await uow.RefreshTokens.GetActiveTokenAsync(refreshToken)
            ?? throw new KeyNotFoundException("Refresh token not found.");

        if (storedToken.UserId != userId)
            throw new UnauthorizedAccessException("Token does not belong to user.");

        storedToken.Revoked = DateTime.UtcNow;
        await uow.SaveChangesAsync();
    }

    private async Task<LoginResponseDto> BuildLoginResponse(ApplicationUser user)
    {
        var roles = await userManager.GetRolesAsync(user);
        var accessToken = tokenService.GenerateAccessToken(user, roles);
        var refreshTokenString = tokenService.GenerateRefreshToken();

        var refreshToken = new RefreshToken
        {
            UserId = user.Id,
            Token = refreshTokenString,
            Expires = DateTime.UtcNow.AddDays(_jwt.RefreshTokenExpirationDays)
        };
        user.RefreshTokens.Add(refreshToken);
        await userManager.UpdateAsync(user);

        return new LoginResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshTokenString,
            AccessTokenExpires = DateTime.UtcNow.AddMinutes(_jwt.AccessTokenExpirationMinutes),
            User = new UserInfoDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email!,
                Roles = roles
            }
        };
    }
}
