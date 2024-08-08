using Skillsphere.Core.Models;

namespace SkillSphere.Core.Interfaces
{
    public interface ICreatorRepository
    {
        Task<Creator> GetUserByeEmailAsync(string email);
    }
}
