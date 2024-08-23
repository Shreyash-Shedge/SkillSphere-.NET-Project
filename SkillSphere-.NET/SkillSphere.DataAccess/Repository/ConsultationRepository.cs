using SkillSphere.DataAccess.Data;
using SkillSphere.DataAccess.Repository.IRepository;
using SkillSphere.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.DataAccess.Repository
{
    public class ConsultationRepository : IConsultationRepository
    {
        private readonly ApplicationDbContext _context;

        public ConsultationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Consultation> GetAllConsultations()
        {
            return _context.Consultations.ToList();
        }

        public Consultation GetConsultationById(int id)
        {
            return _context.Consultations.Find(id);
        }

        public void AddConsultation(Consultation consultation)
        {
            _context.Consultations.Add(consultation);
        }

        public void UpdateConsultation(Consultation consultation)
        {
            _context.Consultations.Update(consultation);
        }

        public void DeleteConsultation(int id)
        {
            var consultation = _context.Consultations.Find(id);
            if (consultation != null)
            {
                _context.Consultations.Remove(consultation);
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
