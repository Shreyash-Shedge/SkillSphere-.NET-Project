using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Skillsphere.Core.Models
{
    public class Creator : User
    {
        [Required]
        public string? Bio { get; set; }
    }
}
