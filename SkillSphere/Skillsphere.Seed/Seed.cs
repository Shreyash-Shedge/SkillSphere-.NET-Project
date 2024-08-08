using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Skillsphere.Core.Models;
using System;
using System.Threading.Tasks;

namespace Skillsphere.Seed
{
    public class SeedData
    {
        public static async Task SeedRolesAndAdminAsync(UserManager<User> userManager, RoleManager<IdentityRole<int>> roleManager, ILogger<SeedData> logger)
        {
            try
            {
                var roles = new[] { "Admin", "User", "Creator" };

                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new IdentityRole<int> { Name = role });
                    }
                }

                var adminUser = new Admin
                {
                    UserName = "admin@skillsphere.com",
                    Email = "admin@skillsphere.com",
                    Name = "Admin"
                };

                if (await userManager.FindByEmailAsync(adminUser.Email) == null)
                {
                    var result = await userManager.CreateAsync(adminUser, "Admin123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(adminUser, "Admin");
                    }
                }
            }
            catch (DbUpdateException ex)
            {
                logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }
    }
}
