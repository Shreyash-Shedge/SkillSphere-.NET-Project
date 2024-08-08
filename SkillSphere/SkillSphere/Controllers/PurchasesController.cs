using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using Skillsphere.Services;
using SkillSphere.Core.DTOs;
using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using SkillSphere.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SkillSphere.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly PurchaseService _purchaseService;
        private readonly IPaymentService _paymentService;
        private readonly IUnitOfWork _unitOfWork;

        public PurchasesController(PurchaseService purchaseService, IPaymentService paymentService, IUnitOfWork unitOfWork)
        {
            _purchaseService = purchaseService;
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("user/purchases")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<Purchase>>> GetMyPurchases()
        {
            var userId = int.Parse(User.FindFirstValue("UserId")!);
            var purchases = await _unitOfWork.Purchases.GetPurchasesByUserIdAsync(userId);
            return Ok(purchases);
        }

        [HttpPost("user/purchases")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> InitiatePurchase([FromBody] PurchaseCreateDto purchaseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = int.Parse(User.FindFirstValue("UserId")!);
            var paymentResponse = await _paymentService.CreatePaymentOrderAsync(userId, purchaseDto.CourseId, purchaseDto.Amount);

            return Ok(paymentResponse);
        }

        [HttpPost("user/purchases/verify")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> VerifyPurchase([FromBody] PaymentVerificationDto verificationDto)
        {
            var isValid = await _paymentService.VerifyPaymentAsync(verificationDto.PaymentId!, verificationDto.OrderId!, verificationDto.Signature!);

            if (!isValid)
            {
                return BadRequest("Invalid payment verification.");
            }

            var purchase = new Purchase
            {
                UserId = int.Parse(User.FindFirstValue("UserId")!),
                CourseId = verificationDto.CourseId,
                Amount = verificationDto.Amount,
                PaymentSuccess = true
            };

            await _purchaseService.CreatePurchaseAsync(purchase);
            await _unitOfWork.CompleteAsync();

            return Ok();
        }
    }
}
