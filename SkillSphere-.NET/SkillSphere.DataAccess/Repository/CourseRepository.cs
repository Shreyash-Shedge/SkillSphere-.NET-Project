using System.Collections.Generic;
using System.Linq;

using SkillSphere.DataAccess.Data;
using SkillSphere.Models;

namespace SkillSphere.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Course> GetAllCourses()
        {
            return _context.Courses.ToList();
        }

        public Course GetCourseById(int id)
        {
            return _context.Courses.FirstOrDefault(c => c.Id == id);
        }

        public void AddCourse(Course course)
        {
            _context.Courses.Add(course);
        }

        public void UpdateCourse(Course course)
        {
            _context.Courses.Update(course);
        }

        public void DeleteCourse(int id)
        {
            var course = _context.Courses.Find(id);
            if (course != null)
            {
                _context.Courses.Remove(course);
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
