using System.Linq.Expressions;
using LMS.Domain.Common;
using LMS.Domain.Interfaces.Repositories;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class GenericRepository<T>(ApplicationDbContext context) : IGenericRepository<T>
    where T : BaseEntity
{
    protected readonly DbSet<T> DbSet = context.Set<T>();

    public async Task<T?> GetByIdAsync(Guid id) =>
        await DbSet.FindAsync(id);

    public async Task<IEnumerable<T>> GetAllAsync() =>
        await DbSet.AsNoTracking().ToListAsync();

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate) =>
        await DbSet.AsNoTracking().Where(predicate).ToListAsync();

    public async Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate) =>
        await DbSet.AsNoTracking().FirstOrDefaultAsync(predicate);

    public async Task AddAsync(T entity) =>
        await DbSet.AddAsync(entity);

    public void Update(T entity) =>
        DbSet.Update(entity);

    public void Delete(T entity) =>
        DbSet.Remove(entity);

    public async Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null) =>
        predicate == null
            ? await DbSet.AsNoTracking().CountAsync()
            : await DbSet.AsNoTracking().CountAsync(predicate);

    public async Task<(IEnumerable<T> Items, int Total)> GetPagedAsync(
        int page, int pageSize, Expression<Func<T, bool>>? predicate = null)
    {
        var query = predicate == null
            ? DbSet.AsNoTracking()
            : DbSet.AsNoTracking().Where(predicate);
        var total = await query.CountAsync();
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return (items, total);
    }
}
