using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillSphere.Core.DTOs;
using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;

namespace SkillSphere.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultationController : ControllerBase
    {
        private readonly IConsultationService _consultationService;

        public ConsultationController(IConsultationService consultationService)
        {
            _consultationService = consultationService;
        }

        [HttpGet]
        [Authorize(Roles = "Creator")]
        public ActionResult<IEnumerable<Consultation>> GetAllConsultations()
        {
            var consultations = _consultationService.GetAllConsultations();
            return Ok(consultations);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Creator")]
        public ActionResult<Consultation> GetConsultationById(Guid id)
        {
            var consultation = _consultationService.GetConsultationById(id);
            if (consultation == null)
            {
                return NotFound();
            }
            return Ok(consultation);
        }

        [HttpPost]
        [Authorize(Roles = "Creator")]
        public ActionResult<Consultation> AddConsultation([FromBody] ConsultationAddDto consultationAddDto)
        {
            var consultEntity = new Consultation()
            {
                Title = consultationAddDto.Title,
                Description = consultationAddDto.Description,
                SlotsPerUser = consultationAddDto.SlotsPerUser,
                Duration = consultationAddDto.Duration,
                CallPlatform = consultationAddDto.CallPlatform,
                ExternalLink = consultationAddDto.ExternalLink,
                Price = consultationAddDto.Price,
                StartDate = consultationAddDto.StartDate,
                EndDate = consultationAddDto.EndDate,
                StartTime = consultationAddDto.StartTime,
                EndTime = consultationAddDto.EndTime,

            };

            _consultationService.AddConsultation(consultEntity);
            return Ok(consultEntity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Creator")]
        public IActionResult UpdateConsultation(Guid id, [FromBody] ConsultationUpdateDto consultationUpdateDto)
        {
            var consultation = _consultationService.GetConsultationById(id);
            if (consultation == null)
            {
                return NotFound();
            }
            consultation.Title = consultationUpdateDto.Title;
            consultation.Description = consultationUpdateDto.Description;
            consultation.SlotsPerUser = consultationUpdateDto.SlotsPerUser;
            consultation.Duration = consultationUpdateDto.Duration;
            consultation.CallPlatform = consultationUpdateDto.CallPlatform;
            consultation.ExternalLink = consultationUpdateDto.ExternalLink;
            consultation.Price = consultationUpdateDto.Price;
            consultation.StartDate = consultationUpdateDto.StartDate;
            consultation.EndDate = consultationUpdateDto.EndDate;
            consultation.StartTime = consultationUpdateDto.StartTime;
            consultation.EndTime = consultationUpdateDto.EndTime;

            _consultationService.UpdateConsultation(consultation);
            return Ok(consultation);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Creator")]
        public IActionResult DeleteConsultation(Guid id)
        {
            var consultation = _consultationService.GetConsultationById(id);
            if (consultation == null)
            {
                return NotFound();
            }

            _consultationService.DeleteConsultation(id);
            return NoContent();
        }
    }
}