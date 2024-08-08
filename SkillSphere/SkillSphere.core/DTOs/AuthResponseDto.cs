using System.Collections.Generic;

namespace Skillsphere.Core.DTOs
{
    public class AuthResponseDto
    {
        public bool IsSuccess { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
        public IEnumerable<string>? Errors { get; set; }

        public string? Name { get; set; }
        public int? UserId { get; set; }  // Added UserId property
        public int? CreatorId { get; set; }  // Added CreatorId property
        public int? AdminId { get; set; }  // Added AdminId property
    }
}
