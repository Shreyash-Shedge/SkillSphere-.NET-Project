using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Skillsphere.Core.Models;
using SkillSphere.Core.Models;

namespace Skillsphere.Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Creator> Creators { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Purchase> Purchases { get; set; }

        public DbSet<Consultation> Consultations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Specify precision and scale for decimal properties
            builder.Entity<Course>()
                .Property(c => c.Price)
                .HasPrecision(18, 2);

            builder.Entity<Purchase>()
                .Property(p => p.Amount)
                .HasPrecision(18, 2);

            // Define relationships with OnDelete set to Cascade
            builder.Entity<Course>()
                .HasMany(c => c.Modules)
                .WithOne(m => m.Course)
                .HasForeignKey(m => m.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Module>()
                .HasMany(m => m.Videos)
                .WithOne(v => v.Module)
                .HasForeignKey(v => v.ModuleId)
                .OnDelete(DeleteBehavior.Cascade);

            // Define relationships for Purchase
            builder.Entity<Purchase>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Purchase>()
                .HasOne(p => p.Course)
                .WithMany()
                .HasForeignKey(p => p.CourseId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
