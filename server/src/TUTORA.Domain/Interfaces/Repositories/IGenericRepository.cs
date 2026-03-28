using System.Linq.Expressions;
using LMS.Domain.Common;

namespace LMS.Domain.Interfaces.Repositories;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
    Task AddAsync(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null);
    Task<(IEnumerable<T> Items, int Total)> GetPagedAsync(int page, int pageSize, Expression<Func<T, bool>>? predicate = null);
}
