using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project.Authentication;

namespace project.Models {

    public class Todo {

        [Required]
        [Key]
        public int TodoId { get; set; }

        [Required]
        [MinLength(5)]
        public string? TodoBody { get; set; }

        [Required]
        public string? TodoPriority { get; set; }

        public string? UserId { get; set; }

    }
}