using SkillSphere.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.DataAccess.Repository.IRepository
{
    public interface IConsultationRepository
    {
        IEnumerable<Consultation> GetAllConsultations();
        Consultation GetConsultationById(int id);
        void AddConsultation(Consultation consultation);
        void UpdateConsultation(Consultation consultation);
        void DeleteConsultation(int id);
        void Save();
    }
}
