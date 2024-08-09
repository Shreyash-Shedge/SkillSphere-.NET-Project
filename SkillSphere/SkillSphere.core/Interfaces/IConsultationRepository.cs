using SkillSphere.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Core.Interfaces
{
    public interface IConsultationRepository
    {
        IEnumerable<Consultation> GetAllConsultation();


        Consultation GetConsultationById(Guid id);


        void AddConsultation(Consultation consultation);


        void UpdateConsultation(Consultation consultation);


        void DeleteConsultation(Guid id);

    }
}
