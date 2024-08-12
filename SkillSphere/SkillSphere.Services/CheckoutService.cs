using Microsoft.Extensions.Configuration;
using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace SkillSphere.Services
{
    public class CheckoutService : ICheckoutService
    {
        private readonly IConfiguration _configuration;
        private readonly string _paypalClientId;
        private readonly string _paypalSecret;
        private readonly string _paypalUrl;

        public CheckoutService(IConfiguration configuration)
        {
            _configuration = configuration;
            _paypalClientId = configuration["PayPalSettings:ClientId"]!;
            _paypalSecret = configuration["PayPalSettings:Secret"]!;
            _paypalUrl = configuration["PayPalSettings:Url"]!;
        }

        public async Task<string> CreateOrder(OrderRequest orderRequest)
        {
            var accessToken = await GetPayPalAccessToken();

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                var orderPayload = new
                {
                    intent = "CAPTURE",
                    purchase_units = new[]
                    {
                        new
                        {
                            amount = new
                            {
                                currency_code = "USD",
                                value = orderRequest.Amount
                            }
                        }
                    }
                };

                var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"{_paypalUrl}/v2/checkout/orders");
                requestMessage.Content = new StringContent(JsonSerializer.Serialize(orderPayload), Encoding.UTF8, "application/json");

                var httpResponse = await client.SendAsync(requestMessage);

                if (httpResponse.IsSuccessStatusCode)
                {
                    return await httpResponse.Content.ReadAsStringAsync();
                }
                else
                {
                    throw new Exception(await httpResponse.Content.ReadAsStringAsync());
                }
            }
        }

        public async Task<string> CaptureOrder(string orderId)
        {
            var accessToken = await GetPayPalAccessToken();

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"{_paypalUrl}/v2/checkout/orders/{orderId}/capture");
                requestMessage.Content = new StringContent("{}", Encoding.UTF8, "application/json");

                var httpResponse = await client.SendAsync(requestMessage);

                if (httpResponse.IsSuccessStatusCode)
                {
                    var response = await httpResponse.Content.ReadAsStringAsync();
                    var jsonResponse = JsonNode.Parse(response);

                    if (jsonResponse?["status"]?.ToString() == "COMPLETED")
                    {
                        return response;
                    }
                    else
                    {
                        throw new Exception("Payment capture was not completed.");
                    }
                }
                else
                {
                    throw new Exception(await httpResponse.Content.ReadAsStringAsync());
                }
            }
        }

        private async Task<string> GetPayPalAccessToken()
        {
            string url = $"{_paypalUrl}/v1/oauth2/token";

            using (var client = new HttpClient())
            {
                var credentials64 = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{_paypalClientId}:{_paypalSecret}"));
                client.DefaultRequestHeaders.Add("Authorization", "Basic " + credentials64);

                var requestMessage = new HttpRequestMessage(HttpMethod.Post, url)
                {
                    Content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded")
                };

                var httpResponse = await client.SendAsync(requestMessage);

                if (httpResponse.IsSuccessStatusCode)
                {
                    var strResponse = await httpResponse.Content.ReadAsStringAsync();
                    var jsonResponse = JsonNode.Parse(strResponse);
                    return jsonResponse?["access_token"]?.ToString() ?? "";
                }
                else
                {
                    throw new Exception("Failed to retrieve PayPal access token");
                }
            }
        }
    }
}
