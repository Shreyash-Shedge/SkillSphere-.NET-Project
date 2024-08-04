using SkillSphere.Core.Interfaces;

namespace Skillsphere.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        ICreatorRepository Creators { get; }
        Task<int> CompleteAsync();
    }
}
