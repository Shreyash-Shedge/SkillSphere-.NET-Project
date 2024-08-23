using System.ComponentModel.DataAnnotations;

namespace SkillSphere.Models
{
    public class Consultation
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
       
        public int Duration { get; set; }
        public string CallPlatform { get; set; }
        public string ExternalLink { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
       
    }
}