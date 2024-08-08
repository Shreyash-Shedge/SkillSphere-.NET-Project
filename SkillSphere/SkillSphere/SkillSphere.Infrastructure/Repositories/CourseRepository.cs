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
            var course = await _context.Courses.FindAsync(id);
            if (course != null)
            {
                _context.Courses.Remove(course);
            }
        }
    }
}
