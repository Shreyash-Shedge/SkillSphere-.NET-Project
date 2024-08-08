using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Core.DTOs
{
    public class PaymentResponse
    {
        public string? OrderId { get; set; }
        public decimal? Amount { get; set; }
        public string? Currency { get; set; }
        public string? Key { get; set; }
    }
}
