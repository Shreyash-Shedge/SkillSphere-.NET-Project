using Microsoft.EntityFrameworkCore;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using Skillsphere.Infrastructure.Data;
using SkillSphere.Core.Interfaces;
using System.Threading.Tasks;

namespace Skillsphere.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByeEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        // Other user-specific methods...
    }
}
