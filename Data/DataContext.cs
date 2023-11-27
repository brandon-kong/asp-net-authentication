using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using project.Authentication;
using project.Models;

namespace project.Data {
    public class DataContext: IdentityDbContext<UserModel> {

        public DataContext(DbContextOptions<DataContext> options) : base(options) {
           
        }
        
        public DbSet<Todo> Todo { get; set; }

        public string? DbPath { get; }

    }
}