using System.Collections.Generic;
using TeacherWhatsNext.Models;

namespace TeacherWhatsNext.Repositories
{
    public interface IGradeRepository
    {
        void Add(Grade grade);
        void Delete(int id);
        List<Grade> GetAllGrades();
        Grade GetById(int id);
        void Update(Grade grade);
    }
}