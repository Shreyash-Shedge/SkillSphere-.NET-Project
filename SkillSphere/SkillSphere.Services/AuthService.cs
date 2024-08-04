using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Skillsphere.Core.DTOs;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Skillsphere.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<User> userManager, IMapper mapper, IConfiguration configuration)
        {
            _userManager = userManager;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> RegisterUserAsync(RegisterDto registerDto)
        {
            var user = _mapper.Map<User>(registerDto);
            user.UserName = registerDto.Email;
            var result = await _userManager.CreateAsync(user, registerDto.Password!);

            if (!result.Succeeded)
            {
                return new AuthResponseDto { IsSuccess = false, Errors = result.Errors.Select(e => e.Description) };
            }

            await _userManager.AddToRoleAsync(user, "User");

            var token = GenerateJwtToken(user);
            return new AuthResponseDto { IsSuccess = true, Token = token };
        }

        public async Task<AuthResponseDto> RegisterCreatorAsync(RegisterCreatorDto registerCreatorDto)
        {
            var creator = _mapper.Map<Creator>(registerCreatorDto);
            creator.UserName = registerCreatorDto.Email;
            var result = await _userManager.CreateAsync(creator, registerCreatorDto.Password!);

            if (!result.Succeeded)
            {
                return new AuthResponseDto { IsSuccess = false, Errors = result.Errors.Select(e => e.Description) };
            }

            await _userManager.AddToRoleAsync(creator, "Creator");

            var token = GenerateJwtToken(creator);
            return new AuthResponseDto { IsSuccess = true, Token = token };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email!);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password!))
            {
                return new AuthResponseDto { IsSuccess = false, Errors = ["Invalid login attempt"] };
            }

            var token = GenerateJwtToken(user);
            return new AuthResponseDto { IsSuccess = true, Token = token };
        }

        private string GenerateJwtToken(User user)
        {
            var userRoles = _userManager.GetRolesAsync(user).Result;

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Email!),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.UserName!)
            };

            claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
