using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Skillsphere.Core.Models;

namespace SkillSphere.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
       private readonly UserManager<User> _userManager;

        public UsersController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var userInfo = new
            {
                user.Id,
                user.UserName,
                user.Email
            };

            return Ok(userInfo);
        }
    }
}
