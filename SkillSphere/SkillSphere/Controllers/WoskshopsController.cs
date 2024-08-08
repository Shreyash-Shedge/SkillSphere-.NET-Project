using Microsoft.AspNetCore.Mvc;

namespace SkillSphere.API.Controllers
{
    public class WoskshopsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
