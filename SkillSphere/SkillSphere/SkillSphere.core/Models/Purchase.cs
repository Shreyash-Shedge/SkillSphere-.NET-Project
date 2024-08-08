using Skillsphere.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Core.Models
{
    public class Purchase
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CourseId { get; set; }

        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;

        [Required]
        public decimal Amount { get; set; }

        public bool PaymentSuccess { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("CourseId")]
        public Course? Course { get; set; }
    }
}
