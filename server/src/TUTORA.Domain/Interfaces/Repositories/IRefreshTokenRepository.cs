using LMS.Domain.Entities.Identity;

namespace LMS.Domain.Interfaces.Repositories;

public interface IRefreshTokenRepository
{
    Task<RefreshToken?> GetActiveTokenAsync(string token);
    Task RevokeAllUserTokensAsync(Guid userId);
    Task AddAsync(RefreshToken token);
}
