using SkillSphere.Core.Models;

namespace SkillSphere.Core.Interfaces
{
    public interface IPurchaseRepository
    {
        Task<IEnumerable<Purchase>> GetPurchasesByUserIdAsync(int userId);
        Task<Purchase> GetPurchaseByIdAsync(int id);
        Task<Purchase> GetPurchaseByUserIdAndCourseIdAsync(int userId, int courseId);
        Task CreatePurchaseAsync(Purchase purchase);
        Task UpdatePurchaseAsync(Purchase purchase);
        Task DeletePurchaseAsync(int id);
    }
}
