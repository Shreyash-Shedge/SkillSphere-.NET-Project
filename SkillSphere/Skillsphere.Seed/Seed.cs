using Microsoft.AspNetCore.Identity;
using Skillsphere.Core.Models;

namespace Skillsphere.Seed
{
    public class SeedData
    {
        public static async Task SeedRolesAndAdminAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            var roles = new[] { "Admin", "User", "Creator" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            var adminUser = new User
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
    }
}
