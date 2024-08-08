using Skillsphere.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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
    }
}
