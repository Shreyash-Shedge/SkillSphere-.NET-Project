using Microsoft.AspNetCore.Mvc;

namespace SkillSphere.API.Controllers
{
    public class CoursesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
