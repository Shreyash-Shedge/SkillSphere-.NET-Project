using SkillSphere.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillSphere.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
      

        IApplicationUserRepository ApplicationUser { get; }

        ICourseRepository CourseRepository { get; }
        IConsultationRepository ConsultationRepository { get; }

        void Save();
    }
}
