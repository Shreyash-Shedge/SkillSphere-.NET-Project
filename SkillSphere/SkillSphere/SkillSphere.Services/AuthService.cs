using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Skillsphere.Core.DTOs;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using System;
using System.Collections.Generic;
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
            user.Name = registerDto.Name;
            var result = await _userManager.CreateAsync(user, registerDto.Password!);

            if (!result.Succeeded)
            {
                return new AuthResponseDto { IsSuccess = false, Errors = result.Errors.Select(e => e.Description) };
            }

            await _userManager.AddToRoleAsync(user, "User");

            var token = GenerateJwtToken(user, "User");
            return new AuthResponseDto { IsSuccess = true, Token = token, Role = "User", UserId = user.Id, Name = user.Name }; // Added UserId
        }

        public async Task<AuthResponseDto> RegisterCreatorAsync(RegisterCreatorDto registerCreatorDto)
        {
            var creator = _mapper.Map<Creator>(registerCreatorDto);
            creator.UserName = registerCreatorDto.Email;
            creator.Name = registerCreatorDto.Name;
            var result = await _userManager.CreateAsync(creator, registerCreatorDto.Password!);

            if (!result.Succeeded)
            {
                return new AuthResponseDto { IsSuccess = false, Errors = result.Errors.Select(e => e.Description) };
            }

            await _userManager.AddToRoleAsync(creator, "Creator");

            var token = GenerateJwtToken(creator, "Creator");
            return new AuthResponseDto { IsSuccess = true, Token = token, Role = "Creator", CreatorId = creator.Id, Name = registerCreatorDto.Name }; // Added CreatorId
        }

        public async Task<AuthResponseDto> RegisterAdminAsync(RegisterDto registerDto)
        {
            var admin = _mapper.Map<Admin>(registerDto);
            admin.UserName = registerDto.Email;
            admin.Name = registerDto.Name;
            var result = await _userManager.CreateAsync(admin, registerDto.Password!);

            if (!result.Succeeded)
            {
                return new AuthResponseDto { IsSuccess = false, Errors = result.Errors.Select(e => e.Description) };
            }

            await _userManager.AddToRoleAsync(admin, "Admin");

            var token = GenerateJwtToken(admin, "Admin");
            return new AuthResponseDto { IsSuccess = true, Token = token, Role = "Admin", AdminId = admin.Id,Name = admin.Name }; // Added AdminId
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email!);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password!))
            {
                return new AuthResponseDto { IsSuccess = false, Errors = ["Invalid login attempt"] };
            }

            // Retrieve roles for the user
            var roles = await _userManager.GetRolesAsync(user); // Added to fetch roles
            var role = roles.FirstOrDefault(); // Get the first role

            var token = GenerateJwtToken(user, role!);

            // Update the response based on the user's role
            return new AuthResponseDto
            {
                IsSuccess = true,
                Token = token,
                Role = role,
                UserId = role == "User" ? user.Id : (int?)null, 
                CreatorId = role == "Creator" ? user.Id : (int?)null,
                AdminId = role == "Admin" ? user.Id : (int?)null,
                Name = user.Name
            };
        }

        private string GenerateJwtToken(User user, string role)
        {
            var userRoles = _userManager.GetRolesAsync(user).Result;

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Email!),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.UserName!),
                new(ClaimTypes.Name, user.Name!)
            };

            // Add appropriate claims based on the role
            if (role == "User")
            {
                claims.Add(new Claim("UserId", user.Id.ToString()));
            }
            else if (role == "Creator")
            {
                claims.Add(new Claim("CreatorId", user.Id.ToString()));
            }
            else if (role == "Admin")
            {
                claims.Add(new Claim("AdminId", user.Id.ToString()));
            }

            claims.AddRange(userRoles.Select(r => new Claim(ClaimTypes.Role, r)));

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
