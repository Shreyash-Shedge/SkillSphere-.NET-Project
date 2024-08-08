using SkillSphere.Core.DTOs;

namespace SkillSphere.Core.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentResponse> CreatePaymentOrderAsync(int userId, int courseId, decimal amount);
        Task<bool> VerifyPaymentAsync(string paymentId, string orderId, string signature);
    }
}
