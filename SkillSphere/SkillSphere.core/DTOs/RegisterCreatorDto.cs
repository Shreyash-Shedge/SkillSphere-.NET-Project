using System.ComponentModel.DataAnnotations;

namespace Skillsphere.Core.DTOs
{
    public class RegisterCreatorDto : RegisterDto
    {
        [Required]
        public string? Bio { get; set; }
    }
}
