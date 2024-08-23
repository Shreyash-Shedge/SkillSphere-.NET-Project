using SkillSphere.DataAccess.Repository.IRepository;
using SkillSphere.DataAccess.Data;
using SkillSphere.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SkillSphere.DataAccess.Repository;

namespace SkillSphere.DataAccess.Repository
{
    public class ApplicationUserRepository : Repository<ApplicationUser>, IApplicationUserRepository
    {
        private ApplicationDbContext _db;
        public ApplicationUserRepository(ApplicationDbContext db) : base(db) => _db = db;
    }
}
