using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Models
{
    public class UserConsultation
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ConsultationId { get; set; }

        public virtual Consultation Consultation { get; set; }
    }
}
