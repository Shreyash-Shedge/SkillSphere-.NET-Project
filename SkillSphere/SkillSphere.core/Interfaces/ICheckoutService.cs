using SkillSphere.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Core.Interfaces
{
    public interface ICheckoutService
    {
        Task<string> CreateOrder(OrderRequest orderRequest);
        Task<string> CaptureOrder(string orderId);
    }
}
