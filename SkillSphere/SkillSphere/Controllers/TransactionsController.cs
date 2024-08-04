using Microsoft.AspNetCore.Mvc;

namespace SkillSphere.API.Controllers
{
    public class TransactionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
