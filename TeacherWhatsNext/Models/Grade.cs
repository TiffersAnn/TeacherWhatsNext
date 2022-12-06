using System.ComponentModel.DataAnnotations;

namespace TeacherWhatsNext.Models
{
    public class Grade
    {
        public int Id { get; set; }

        [Required]
        public string Level { get; set; }
    }
}
