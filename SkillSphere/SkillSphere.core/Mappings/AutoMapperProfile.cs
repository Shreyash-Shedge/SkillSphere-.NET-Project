using AutoMapper;
using Skillsphere.Core.DTOs;
using Skillsphere.Core.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Skillsphere.Infrastructure.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<RegisterCreatorDto, Creator>();
        }
    }
}
