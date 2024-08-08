using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Core.DTOs
{
    public class PaymentVerificationDto
    {
        [Required]
        public string? PaymentId { get; set; }

        [Required]
        public string? OrderId { get; set; }

        [Required]
        public string? Signature { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}
