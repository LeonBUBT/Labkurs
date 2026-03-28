using System.Security.Claims;
using LMS.Domain.Entities.Identity;

namespace LMS.Application.Interfaces.Services;

public interface ITokenService
{
    string GenerateAccessToken(ApplicationUser user, IList<string> roles);
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}
