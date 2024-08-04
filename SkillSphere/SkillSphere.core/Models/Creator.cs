using System.ComponentModel.DataAnnotations;

namespace Skillsphere.Core.Models
{
    public class Creator : User
    {
        [Required]
        public string? Bio { get; set; }
    }
}
