using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using Skillsphere.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.Infrastructure.Repositories
{
    public class ConsultationRepository : IConsultationRepository
    {
        private readonly AppDbContext context;

        public ConsultationRepository(AppDbContext context)
        {
            this.context = context;

        }
        public void AddConsultation(Consultation consultation)
        {
            consultation.Id = Guid.NewGuid();
            context.Consultations.Add(consultation);
            context.SaveChanges();
        }

        public void DeleteConsultation(Guid id)
        {
            var consultation = context.Consultations.Find(id);
            if (consultation != null)
            {
                context.Consultations.Remove(consultation);
                context.SaveChanges();
            }


        }

        public IEnumerable<Consultation> GetAllConsultation()
        {
            return context.Consultations.ToList();
        }

        public Consultation GetConsultationById(Guid id)
        {
            var consultation = context.Consultations.Find(id);
            return consultation != null ? consultation : null;

        }

        public void UpdateConsultation(Consultation consultation)
        {
            var existingConsultation = context.Consultations.Find(consultation.Id);
            if (existingConsultation != null)
            {
                existingConsultation.Title = consultation.Title;
                existingConsultation.Description = consultation.Description;
                existingConsultation.SlotsPerUser = consultation.SlotsPerUser;
                existingConsultation.Duration = consultation.Duration;
                existingConsultation.CallPlatform = consultation.CallPlatform;
                existingConsultation.ExternalLink = consultation.ExternalLink;
                existingConsultation.Price = consultation.Price;
                existingConsultation.StartDate = consultation.StartDate;
                existingConsultation.EndDate = consultation.EndDate;
                existingConsultation.StartTime = consultation.StartTime;
                existingConsultation.EndTime = consultation.EndTime;

                context.Consultations.Update(existingConsultation);
                context.SaveChanges();
            }
        }
    }
}
