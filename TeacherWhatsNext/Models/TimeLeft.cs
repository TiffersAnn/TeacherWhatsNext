using System.ComponentModel.DataAnnotations;

namespace TeacherWhatsNext.Models
{
    public class TimeLeft
    {
        public int Id { get; set; }

        [Required]
        public string Amount { get; set; }
    }
}
