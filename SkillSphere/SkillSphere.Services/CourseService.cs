using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkillSphere.Services
{
    public class CourseService
    {
        private readonly ICourseRepository _courseRepository;

        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            return await _courseRepository.GetAllCoursesAsync();
        }

        public async Task<Course> GetCourseByIdAsync(int id)
        {
            return await _courseRepository.GetCourseByIdAsync(id);
        }

        public async Task<IEnumerable<Course>> GetCoursesByIdsAsync(List<int> ids)
        {
            return await _courseRepository.GetCoursesByIdsAsync(ids);
        }

        public async Task<IEnumerable<Course>> GetCoursesByCreatorIdAsync(int creatorId)
        {
            return await _courseRepository.GetCoursesByCreatorIdAsync(creatorId);
        }

        public async Task CreateCourseAsync(Course course)
        {
            await _courseRepository.CreateCourseAsync(course);
        }

        public async Task UpdateCourseAsync(Course course)
        {
            await _courseRepository.UpdateCourseAsync(course);
        }

        public async Task DeleteCourseAsync(int id)
        {
            await _courseRepository.DeleteCourseAsync(id);
        }

        public async Task AddModuleAsync(Module module)
        {
            await _courseRepository.AddModuleAsync(module);
        }

        public async Task<Module> GetModuleByIdAsync(int id)
        {
            return await _courseRepository.GetModuleByIdAsync(id);
        }

        public async Task UpdateModuleAsync(Module module)
        {
            await _courseRepository.UpdateModuleAsync(module);
        }

        public async Task DeleteModuleAsync(int id)
        {
            await _courseRepository.DeleteModuleAsync(id);
        }

        public async Task AddVideoAsync(Video video)
        {
            await _courseRepository.AddVideoAsync(video);
        }

        public async Task UpdateVideoAsync(Video video)
        {
            await _courseRepository.UpdateVideoAsync(video);
        }

        public async Task DeleteVideoAsync(int id)
        {
            await _courseRepository.DeleteVideoAsync(id);
        }
    }
}
