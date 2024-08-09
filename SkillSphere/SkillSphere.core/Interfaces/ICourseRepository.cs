using Skillsphere.Core.Models;


namespace SkillSphere.Core.Interfaces
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllCoursesAsync();
        Task<Course> GetCourseByIdAsync(int id);
        Task<IEnumerable<Course>> GetCoursesByIdsAsync(List<int> ids);
        Task<IEnumerable<Course>> GetCoursesByCreatorIdAsync(int creatorId);
        Task CreateCourseAsync(Course course);
        Task UpdateCourseAsync(Course course);
        Task DeleteCourseAsync(int id);
        Task AddModuleAsync(Module module);
        Task<Module> GetModuleByIdAsync(int id);
        Task UpdateModuleAsync(Module module);
        Task DeleteModuleAsync(int id);
        Task AddVideoAsync(Video video);
        Task UpdateVideoAsync(Video video);
        Task DeleteVideoAsync(int id);
    }
}
