using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillSphere.Models
{
    public class Course
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string? Title { get; set; }

        [Required]
        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Url]
        [StringLength(2048)]
        public string? VideoUrl { get; set; }

    }
}
