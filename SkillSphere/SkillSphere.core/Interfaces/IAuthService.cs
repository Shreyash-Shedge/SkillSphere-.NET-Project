using Skillsphere.Core.DTOs;
using System.Threading.Tasks;

namespace Skillsphere.Core.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterUserAsync(RegisterDto registerDto);
        Task<AuthResponseDto> RegisterCreatorAsync(RegisterCreatorDto registerCreatorDto);
        Task<AuthResponseDto> RegisterAdminAsync(RegisterDto registerDto); // Added RegisterAdminAsync
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    }
}
