using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using TeacherWhatsNext.Models;

namespace TeacherWhatsNext
{
    public class Activity
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        
        public string ImageLocation { get; set; }
        [Required]
        public string Content { get; set; }
        public string ContentUrl { get; set; }
        public int SubjectId { get; set; }
        public int TimeLeftId { get; set; }
        public int GradeId { get; set; }
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
        public Subject Subject { get; set; }
        public Grade Grade { get; set; }
        public TimeLeft TimeLeft { get; set; }



    }
}
