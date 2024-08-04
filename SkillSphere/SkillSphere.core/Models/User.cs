using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Skillsphere.Core.Models
{
    public class User : IdentityUser
    {
        [Required]
        [StringLength(100)]
        public string? Name { get; set; }
    }
}
