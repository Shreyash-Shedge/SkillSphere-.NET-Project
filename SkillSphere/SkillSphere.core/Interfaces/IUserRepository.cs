using Skillsphere.Core.Models;

namespace SkillSphere.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByeEmailAsync(string email);
    }
}
