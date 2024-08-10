using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Skillsphere.Core.DTOs;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using Skillsphere.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Skillsphere.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _dbContext;

        public AuthService(UserManager<User> userManager, IMapper mapper, IConfiguration configuration, AppDbContext dbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _configuration = configuration;
            _dbContext = dbContext;
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
            var refreshToken = GenerateRefreshToken();
            await StoreRefreshToken(user.Id, refreshToken);

            return new AuthResponseDto { IsSuccess = true, Token = token, RefreshToken = refreshToken, Role = "User", UserId = user.Id, Name = user.Name };
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
            var refreshToken = GenerateRefreshToken();
            await StoreRefreshToken(creator.Id, refreshToken);

            return new AuthResponseDto { IsSuccess = true, Token = token, RefreshToken = refreshToken, Role = "Creator", CreatorId = creator.Id, Name = creator.Name };
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
            var refreshToken = GenerateRefreshToken();
            await StoreRefreshToken(admin.Id, refreshToken);

            return new AuthResponseDto { IsSuccess = true, Token = token, RefreshToken = refreshToken, Role = "Admin", AdminId = admin.Id, Name = admin.Name };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email!);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password!))
            {
                return new AuthResponseDto { IsSuccess = false, Errors = new[] { "Invalid login attempt" } };
            }

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            var token = GenerateJwtToken(user, role!);
            var refreshToken = GenerateRefreshToken();
            await StoreRefreshToken(user.Id, refreshToken);

            return new AuthResponseDto
            {
                IsSuccess = true,
                Token = token,
                RefreshToken = refreshToken,
                Role = role,
                UserId = role == "User" ? user.Id : (int?)null,
                CreatorId = role == "Creator" ? user.Id : (int?)null,
                AdminId = role == "Admin" ? user.Id : (int?)null,
                Name = user.Name
            };
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
        {
            var storedToken = await _dbContext.RefreshTokens.SingleOrDefaultAsync(rt => rt.Token == refreshToken);

            if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiryDate < DateTime.UtcNow)
            {
                return new AuthResponseDto { IsSuccess = false, Errors = new[] { "Invalid or expired refresh token" } };
            }

            var user = await _userManager.FindByIdAsync(storedToken.UserId.ToString());
            if (user == null)
            {
                return new AuthResponseDto { IsSuccess = false, Errors = new[] { "User not found" } };
            }

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            var newJwtToken = GenerateJwtToken(user, role!);
            var newRefreshToken = GenerateRefreshToken();

            storedToken.Token = newRefreshToken;
            storedToken.ExpiryDate = DateTime.UtcNow.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenDurationInDays"]));
            storedToken.CreatedDate = DateTime.UtcNow;
            storedToken.IsRevoked = false;

            await _dbContext.SaveChangesAsync();

            return new AuthResponseDto
            {
                IsSuccess = true,
                Token = newJwtToken,
                RefreshToken = newRefreshToken
            };
        }

        private string GenerateJwtToken(User user, string role)
        {
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Email!),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.UserName!),
                new(ClaimTypes.Name, user.Name!)
            };

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

            claims.Add(new Claim(ClaimTypes.Role, role));

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

        private string GenerateRefreshToken()
        {
            var randomBytes = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }

        private async Task StoreRefreshToken(int userId, string refreshToken)
        {
            var existingToken = await _dbContext.RefreshTokens.SingleOrDefaultAsync(rt => rt.UserId == userId);

            if (existingToken != null)
            {
                existingToken.Token = refreshToken;
                existingToken.ExpiryDate = DateTime.UtcNow.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenDurationInDays"]));
                existingToken.CreatedDate = DateTime.UtcNow;
                existingToken.IsRevoked = false;
            }
            else
            {
                var newToken = new RefreshToken
                {
                    Token = refreshToken,
                    UserId = userId,
                    CreatedDate = DateTime.UtcNow,
                    ExpiryDate = DateTime.UtcNow.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenDurationInDays"])),
                    IsRevoked = false
                };

                await _dbContext.RefreshTokens.AddAsync(newToken);
            }

            await _dbContext.SaveChangesAsync();
        }
    }
}
