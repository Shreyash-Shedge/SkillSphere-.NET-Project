using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Models.ViewModels
{
    public class UserDashboardViewModel
    {
        public IEnumerable<Course> Courses { get; set; }
        public IEnumerable<Consultation> Consultations { get; set; }
    }
}
