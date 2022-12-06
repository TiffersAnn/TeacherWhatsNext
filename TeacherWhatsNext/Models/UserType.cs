using System.ComponentModel.DataAnnotations;

namespace TeacherWhatsNext.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int TEACHER_ID => 2;
    }
}
