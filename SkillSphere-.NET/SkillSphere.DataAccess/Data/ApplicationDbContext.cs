using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SkillSphere.Models;


namespace SkillSphere.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {


        //New
        public DbSet<Course> Courses { get; set; }

        public DbSet<Consultation> Consultations { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<UserConsultation> UserConsultations { get; set; }




        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }


    }
}