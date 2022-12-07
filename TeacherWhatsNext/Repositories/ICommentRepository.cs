using System.Collections.Generic;
using TeacherWhatsNext.Models;

namespace TeacherWhatsNext.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment newComment);
        void DeleteComment(int commentId);
        void EditComment(Comment comment);
        List<Comment> GetAllComments();
        Comment GetCommentById(int id);
    }
}