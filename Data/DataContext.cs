using Microsoft.EntityFrameworkCore;
using project.Models;

namespace project.Data {
    public class DataContext: DbContext {

        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {

        }
        
        public DbSet<Todo> Todo { get; set; }

        public string? DbPath { get; }

    }
}