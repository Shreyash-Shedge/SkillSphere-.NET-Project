using System.ComponentModel.DataAnnotations;

namespace Skillsphere.Core.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string? Password { get; set; }
    }
}
