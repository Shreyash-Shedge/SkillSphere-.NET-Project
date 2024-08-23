using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillSphere.Models;
using SkillSphere.Repositories;
using SkillSphere.Utility;
using System.Security.Claims;

namespace SkillSphere.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = SD.Role_Admin)]
    public class CourseController : Controller
    {
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        // GET: Course
        public IActionResult Index()
        {
            var courses = _courseRepository.GetAllCourses();
            return View(courses);
        }

        // GET: Course/Details/5
        public IActionResult Details(int id)
        {
            var course = _courseRepository.GetCourseById(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }

        // GET: Course/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Course/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
      
        public IActionResult Create([Bind("Title,Description,Price,VideoUrl")] Course course)
        {
            if (ModelState.IsValid)
            {
                

                _courseRepository.AddCourse(course);
                _courseRepository.Save();
                return RedirectToAction(nameof(Index));
            }
            return View(course);
        }


        // GET: Course/Edit/5
        public IActionResult Edit(int id)
        {
            var course = _courseRepository.GetCourseById(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }

        // POST: Course/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,Title,Description,Price,VideoUrl")] Course course)
        {
            if (id != course.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                _courseRepository.UpdateCourse(course);
                _courseRepository.Save();
                return RedirectToAction(nameof(Index));
            }
            return View(course);
        }

        // GET: Course/Delete/5
        public IActionResult Delete(int id)
        {
            var course = _courseRepository.GetCourseById(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }


        // POST: Course/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                _courseRepository.DeleteCourse(id);
                _courseRepository.Save();
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
