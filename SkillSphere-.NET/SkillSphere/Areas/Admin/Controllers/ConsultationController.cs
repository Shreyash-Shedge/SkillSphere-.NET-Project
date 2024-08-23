using Microsoft.AspNetCore.Mvc;
using SkillSphere.DataAccess.Repository.IRepository;
using SkillSphere.Models;

namespace SkillSphere.Areas.Admin.Controllers
{

    [Area("Admin")]
    public class ConsultationController : Controller
    {
        private readonly IConsultationRepository _consultationRepository;

        public ConsultationController(IConsultationRepository consultationRepository)
        {
            _consultationRepository = consultationRepository;
        }

        // GET: Consultation
        public IActionResult Index()
        {
            var consultations = _consultationRepository.GetAllConsultations();
            return View(consultations);
        }

        // GET: Consultation/Details/5
        public IActionResult Details(int id)
        {
            var consultation = _consultationRepository.GetConsultationById(id);
            if (consultation == null)
            {
                return NotFound();
            }
            return View(consultation);
        }

        // GET: Consultation/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Consultation/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("Title,Description,Duration,CallPlatform,ExternalLink,Price,StartDate")] Consultation consultation)
        {
            if (ModelState.IsValid)
            {
                _consultationRepository.AddConsultation(consultation);
                _consultationRepository.Save();
                return RedirectToAction(nameof(Index));
            }
            return View(consultation);
        }

        // GET: Consultation/Edit/5
        public IActionResult Edit(int id)
        {
            var consultation = _consultationRepository.GetConsultationById(id);
            if (consultation == null)
            {
                return NotFound();
            }
            return View(consultation);
        }

        // POST: Consultation/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,Title,Description,Duration,CallPlatform,ExternalLink,Price,StartDate")] Consultation consultation)
        {
            if (id != consultation.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                _consultationRepository.UpdateConsultation(consultation);
                _consultationRepository.Save();
                return RedirectToAction(nameof(Index));
            }
            return View(consultation);
        }

        // GET: Consultation/Delete/5
        public IActionResult Delete(int id)
        {
            var consultation = _consultationRepository.GetConsultationById(id);
            if (consultation == null)
            {
                return NotFound();
            }
            return View(consultation);
        }

        // POST: Consultation/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            _consultationRepository.DeleteConsultation(id);
            _consultationRepository.Save();
            return RedirectToAction(nameof(Index));
        }
    }
}
