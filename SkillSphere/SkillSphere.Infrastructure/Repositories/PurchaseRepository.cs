using Microsoft.EntityFrameworkCore;
using Skillsphere.Infrastructure.Data;
using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skillsphere.Infrastructure.Repositories
{
    public class PurchaseRepository : IPurchaseRepository
    {
        private readonly AppDbContext _context;

        public PurchaseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Purchase>> GetPurchasesByUserIdAsync(int userId)
        {
            return await _context.Purchases
                .Include(p => p.Course)
                .Where(p => p.UserId == userId)
                .ToListAsync();
        }

        public async Task<Purchase> GetPurchaseByIdAsync(int id)
        {
            return await _context.Purchases
                .Include(p => p.Course)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Purchase> GetPurchaseByUserIdAndCourseIdAsync(int userId, int courseId)
        {
            return await _context.Purchases
                .FirstOrDefaultAsync(p => p.UserId == userId && p.CourseId  == courseId);
        }

        public async Task CreatePurchaseAsync(Purchase purchase)
        {
            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePurchaseAsync(Purchase purchase)
        {
            _context.Purchases.Update(purchase);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePurchaseAsync(int id)
        {
            var purchase = await _context.Purchases.FindAsync(id);
            if (purchase != null)
            {
                _context.Purchases.Remove(purchase);
                await _context.SaveChangesAsync();
            }
        }
    }
}
