using LMS.Domain.Entities.Identity;
using LMS.Domain.Interfaces.Repositories;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class RefreshTokenRepository(ApplicationDbContext context) : IRefreshTokenRepository
{
    private readonly DbSet<RefreshToken> _dbSet = context.Set<RefreshToken>();

    public async Task<RefreshToken?> GetActiveTokenAsync(string token) =>
        await _dbSet.FirstOrDefaultAsync(t => t.Token == token && t.Revoked == null && t.Expires > DateTime.UtcNow);

    public async Task RevokeAllUserTokensAsync(Guid userId)
    {
        var activeTokens = await _dbSet
            .Where(t => t.UserId == userId && t.Revoked == null)
            .ToListAsync();

        foreach (var t in activeTokens)
            t.Revoked = DateTime.UtcNow;
    }

    public async Task AddAsync(RefreshToken token) =>
        await _dbSet.AddAsync(token);
}
