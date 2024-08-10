using System;

namespace Skillsphere.Core.Models
{
    public class RefreshToken
    {
        public int Id { get; set; } // Primary key
        public string? Token { get; set; } // The actual refresh token
        public DateTime CreatedDate { get; set; } // When the token was created
        public DateTime ExpiryDate { get; set; } // When the token expires
        public bool IsRevoked { get; set; } // Whether the token is revoked or not

        // Foreign key relationship with the User entity
        public int UserId { get; set; }
        public User? User { get; set; } // Navigation property
    }
}
