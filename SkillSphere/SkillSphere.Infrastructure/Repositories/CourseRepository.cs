using Microsoft.EntityFrameworkCore;
using Skillsphere.Core.Models;
using SkillSphere.Core.Interfaces;
using Skillsphere.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillSphere.Infrastructure.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly AppDbContext _context;

        public CourseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            return await _context.Courses
                                 .Include(c => c.Modules)
                                 .ThenInclude(m => m.Videos)
                                 .ToListAsync();
        }

        public async Task<Course> GetCourseByIdAsync(int id)
        {
            return await _context.Courses
                                 .Include(c => c.Modules)
                                 .ThenInclude(m => m.Videos)
                                 .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Course>> GetCoursesByIdsAsync(List<int> ids)
        {
            return await _context.Courses
                                 .Where(c => ids.Contains(c.Id))
                                 .Include(c => c.Modules)
                                 .ThenInclude(m => m.Videos)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetCoursesByCreatorIdAsync(int creatorId)
        {
            return await _context.Courses
                                 .Where(c => c.CreatorId == creatorId)
                                 .Include(c => c.Modules)
                                 .ThenInclude(m => m.Videos)
                                 .ToListAsync();
        }

        public async Task CreateCourseAsync(Course course)
        {
            await _context.Courses.AddAsync(course);
        }

        public async Task UpdateCourseAsync(Course course)
        {
            _context.Courses.Update(course);
        }

        public async Task DeleteCourseAsync(int id)
        {
            var course = await _context.Courses
                                       .Include(c => c.Modules)
                                       .ThenInclude(m => m.Videos)
                                       .FirstOrDefaultAsync(c => c.Id == id);
            if (course != null)
            {
                foreach (var module in course.Modules)
                {
                    foreach (var video in module.Videos)
                    {
                        if (System.IO.File.Exists(video.FilePath))
                        {
                            System.IO.File.Delete(video.FilePath);
                        }
                    }
                }
                _context.Courses.Remove(course);
            }
        }

        public async Task AddModuleAsync(Module module)
        {
            await _context.Modules.AddAsync(module);
        }

        public async Task<Module> GetModuleByIdAsync(int id)
        {
            return await _context.Modules
                                 .Include(m => m.Videos)
                                 .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task UpdateModuleAsync(Module module)
        {
            _context.Modules.Update(module);
        }

        public async Task DeleteModuleAsync(int id)
        {
            var module = await _context.Modules
                                       .Include(m => m.Videos)
                                       .FirstOrDefaultAsync(m => m.Id == id);
            if (module != null)
            {
                foreach (var video in module.Videos)
                {
                    if (System.IO.File.Exists(video.FilePath))
                    {
                        System.IO.File.Delete(video.FilePath);
                    }
                }
                _context.Modules.Remove(module);
            }
        }

        public async Task AddVideoAsync(Video video)
        {
            await _context.Videos.AddAsync(video);
        }

        public async Task UpdateVideoAsync(Video video)
        {
            _context.Videos.Update(video);
        }

        public async Task DeleteVideoAsync(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            if (video != null)
            {
                if (System.IO.File.Exists(video.FilePath))
                {
                    System.IO.File.Delete(video.FilePath);
                }
                _context.Videos.Remove(video);
            }
        }
    }
}
