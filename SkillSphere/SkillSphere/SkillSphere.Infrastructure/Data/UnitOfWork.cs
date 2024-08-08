using Skillsphere.Core.Interfaces;
using Skillsphere.Infrastructure.Repositories;
using SkillSphere.Core.Interfaces;
using SkillSphere.Infrastructure.Repositories;
using System.Threading.Tasks;

namespace Skillsphere.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public IUserRepository Users { get; }
        public ICreatorRepository Creators { get; }
        public ICourseRepository Courses { get; }
        public IPurchaseRepository Purchases { get; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
            Creators = new CreatorRepository(_context);
            Courses = new CourseRepository(_context);
            Purchases = new PurchaseRepository(_context);
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        void IDisposable.Dispose() => _context.Dispose();
    }
}
