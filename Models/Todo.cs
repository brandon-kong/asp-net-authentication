using System.ComponentModel.DataAnnotations;

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

    }
}