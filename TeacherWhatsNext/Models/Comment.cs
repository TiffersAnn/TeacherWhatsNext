using System;

namespace TeacherWhatsNext.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int ActivityId { get; set; }
        public int UserProfileId { get; set; }
        public string Content { get; set; }
        public string Subject { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
