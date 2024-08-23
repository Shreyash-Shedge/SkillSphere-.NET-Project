using SkillSphere.DataAccess.Repository.IRepository;
using SkillSphere.DataAccess.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SkillSphere.Repositories;
using SkillSphere.Models;

namespace SkillSphere.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
      

        public IApplicationUserRepository ApplicationUser { get; private set; }

        public ICourseRepository CourseRepository { get; private set; }
        public IConsultationRepository  ConsultationRepository { get; private set; }

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
           
            CourseRepository = new CourseRepository(_db);
            ConsultationRepository = new ConsultationRepository(_db);
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
