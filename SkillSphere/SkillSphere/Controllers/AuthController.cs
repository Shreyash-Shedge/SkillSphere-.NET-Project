using Microsoft.AspNetCore.Mvc;
using Skillsphere.Core.DTOs;
using Skillsphere.Core.Interfaces;
using System.Threading.Tasks;

namespace Skillsphere.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService) => _authService = authService;

        [HttpPost("register-user")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto registerDto)
        {
            var result = await _authService.RegisterUserAsync(registerDto);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Errors);
            }

            // Set the JWT token in an HttpOnly cookie
            Response.Cookies.Append("token", result.Token!, new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Ensure this is only used over HTTPS
                SameSite = SameSiteMode.Strict
            });

            return Ok();
        }

        [HttpPost("register-creator")]
        public async Task<IActionResult> RegisterCreator([FromBody] RegisterCreatorDto registerCreatorDto)
        {
            var result = await _authService.RegisterCreatorAsync(registerCreatorDto);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Errors);
            }

            Response.Cookies.Append("token", result.Token!, new CookieOptions
            {
                HttpOnly = true,
                Secure = true, 
                SameSite = SameSiteMode.Strict
            });

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Errors);
            }

            Response.Cookies.Append("token", result.Token!, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            return Ok(new {role = result.Role});
        }
    }
}
