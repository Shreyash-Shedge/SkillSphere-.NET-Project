using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using SkillSphere.Core.DTOs;
using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using System.Net.Http.Headers;
using System.Text;

namespace SkillSphere.Services
{
    public class RazorpayPaymentService : IPaymentService
    {
        private readonly RazorpaySettings _razorpaySettings;
        private readonly HttpClient _httpClient;

        public RazorpayPaymentService(IOptions<RazorpaySettings> razorpaySettings, HttpClient httpClient)
        {
            _razorpaySettings = razorpaySettings.Value;
            _httpClient = httpClient;
        }

        public async Task<PaymentResponse> CreatePaymentOrderAsync(int userId, int courseId, decimal amount)
        {
            var key = _razorpaySettings.Key;
            var secret = _razorpaySettings.Secret;

            var authToken = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{key}:{secret}"));

            var requestContent = new FormUrlEncodedContent(
            [
                new KeyValuePair<string, string>("amount", ((int)(amount * 100)).ToString()), // amount in paise
                new KeyValuePair<string, string>("currency", "INR"),
                new KeyValuePair<string, string>("receipt", $"order_rcptid_{Guid.NewGuid()}")
            ]);

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.razorpay.com/v1/orders")
            {
                Headers =
                {
                    Authorization = new AuthenticationHeaderValue("Basic", authToken)
                },
                Content = requestContent
            };

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            var jsonResponse = JObject.Parse(responseBody);

            var orderId = jsonResponse["id"]!.ToString();

            return new PaymentResponse
            {
                OrderId = orderId,
                Amount = amount,
                Currency = "INR",
                Key = key
            };
        }

        public async Task<bool> VerifyPaymentAsync(string paymentId, string orderId, string signature)
        {
            var key = _razorpaySettings.Key;
            var secret = _razorpaySettings.Secret;

            var generatedSignature = GenerateSignature($"{orderId}|{paymentId}", secret!);

            return signature == generatedSignature;
        }

        private static string GenerateSignature(string data, string secret)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA256(Encoding.UTF8.GetBytes(secret));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
    }
}
