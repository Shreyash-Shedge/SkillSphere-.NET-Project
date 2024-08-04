using System.Collections.Generic;

namespace Skillsphere.Core.DTOs
{
    public class AuthResponseDto
    {
        public bool IsSuccess { get; set; }
        public string? Token { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}
