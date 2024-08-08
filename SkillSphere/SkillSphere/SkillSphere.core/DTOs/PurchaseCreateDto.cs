using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Core.DTOs
{
    public class PurchaseCreateDto
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}
