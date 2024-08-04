using Microsoft.EntityFrameworkCore;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using Skillsphere.Infrastructure.Data;
using SkillSphere.Core.Interfaces;
using System.Threading.Tasks;

namespace Skillsphere.Infrastructure.Repositories
{
    public class CreatorRepository : ICreatorRepository
    {
        private readonly AppDbContext _context;

        public CreatorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Creator> GetUserByeEmailAsync(string email)
        {
            return await _context.Creators.SingleOrDefaultAsync(c => c.Email == email);
        }

        // Other creator-specific methods...
    }
}
