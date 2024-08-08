using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Skillsphere.Core.Models
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
        public int CreatorId { get; set; }

        public Creator? Creator { get; set; }

        [Required]
        public decimal Price { get; set; }

        public List<Module> Modules { get; set; } = new List<Module>();
    }

    public class Module
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string? Title { get; set; }

        public string? Content { get; set; }

        public int CourseId { get; set; }

        public Course? Course { get; set; }

        public List<Video> Videos { get; set; } = [];
    }

    public class Video
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string? Title { get; set; }

        [Required]
        public string? FilePath { get; set; }

        public int ModuleId { get; set; }

        public Module? Module { get; set; }
    }
}
