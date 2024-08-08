using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Core.DTOs
{
    public class ModuleDto
    {
        [Required]
        [StringLength(150)]
        public string? Title { get; set; }

        public string? Content { get; set; }

        [Required]
        public List<VideoDto>? Videos { get; set; }
    }
}
