using Microsoft.AspNetCore.Identity;

namespace project.Authentication {
    public class UserModel : IdentityUser {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        
    }
}