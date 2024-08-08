using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkillSphere.Services
{
    public class PurchaseService
    {
        private readonly IPurchaseRepository _purchaseRepository;

        public PurchaseService(IPurchaseRepository purchaseRepository)
        {
            _purchaseRepository = purchaseRepository;
        }

        public async Task<IEnumerable<Purchase>> GetPurchasesByUserIdAsync(int userId)
        {
            return await _purchaseRepository.GetPurchasesByUserIdAsync(userId);
        }

        public async Task<Purchase> GetPurchaseByIdAsync(int id)
        {
            return await _purchaseRepository.GetPurchaseByIdAsync(id);
        }

        public async Task CreatePurchaseAsync(Purchase purchase)
        {
            await _purchaseRepository.CreatePurchaseAsync(purchase);
        }

        public async Task UpdatePurchaseAsync(Purchase purchase)
        {
            await _purchaseRepository.UpdatePurchaseAsync(purchase);
        }

        public async Task DeletePurchaseAsync(int id)
        {
            await _purchaseRepository.DeletePurchaseAsync(id);
        }
    }
}
