using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Core.Models
{
    public class Consultation
    {
        [Key]
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int SlotsPerUser { get; set; }
        public int Duration { get; set; }
        public required string CallPlatform { get; set; }
        public required string ExternalLink { get; set; }
        public required string Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}