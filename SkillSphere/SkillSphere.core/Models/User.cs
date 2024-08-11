using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Skillsphere.Core.Models
{
    public class User : IdentityUser<int>
    {
        [Required]
        [StringLength(100)]
        public string? Name { get; set; }

        public string? Role { get; set; }

        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
