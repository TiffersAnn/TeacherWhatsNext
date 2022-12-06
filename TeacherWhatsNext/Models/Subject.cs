﻿using System.ComponentModel.DataAnnotations;

namespace TeacherWhatsNext.Models
{
    public class Subject
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
