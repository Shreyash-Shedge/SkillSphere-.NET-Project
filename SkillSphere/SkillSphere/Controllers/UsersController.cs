using Microsoft.AspNetCore.Mvc;

namespace SkillSphere.API.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
