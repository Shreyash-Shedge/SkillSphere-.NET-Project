using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Models
{
    public class UserCourse
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int CourseId { get; set; }

        public virtual Course Course { get; set; }
    }
}
