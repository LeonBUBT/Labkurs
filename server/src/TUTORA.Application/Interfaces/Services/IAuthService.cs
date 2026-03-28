using LMS.Application.DTOs.Auth;

namespace LMS.Application.Interfaces.Services;

public interface IAuthService
{
    Task<LoginResponseDto> RegisterAsync(RegisterRequestDto dto);
    Task<LoginResponseDto> LoginAsync(LoginRequestDto dto);
    Task<LoginResponseDto> RefreshTokenAsync(RefreshTokenRequestDto dto);
    Task RevokeTokenAsync(string refreshToken, Guid userId);
}
