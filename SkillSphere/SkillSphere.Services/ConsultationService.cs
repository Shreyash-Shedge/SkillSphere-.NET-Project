using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Services
{
    public class ConsultationService : IConsultationService
    {
        private readonly IConsultationRepository _consultationRepository;

        public ConsultationService(IConsultationRepository consultationRepository)
        {
            _consultationRepository = consultationRepository;
        }

        public void AddConsultation(Consultation consultation)
        {
            _consultationRepository.AddConsultation(consultation);
        }

        public void DeleteConsultation(Guid id)
        {
            _consultationRepository.DeleteConsultation(id);
        }

        public IEnumerable<Consultation> GetAllConsultations()
        {
            return _consultationRepository.GetAllConsultation();
        }

        public Consultation GetConsultationById(Guid id)
        {
            return _consultationRepository.GetConsultationById(id);
        }

        public void UpdateConsultation(Consultation consultation)
        {
            _consultationRepository.UpdateConsultation(consultation);
        }
    }
}
