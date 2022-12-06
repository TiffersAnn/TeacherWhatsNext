using System.Collections.Generic;
using TeacherWhatsNext.Models;

namespace TeacherWhatsNext.Repositories
{
    public interface ISubjectRepository
    {
        void Add(Subject subject);
        void Delete(int id);
        List<Subject> GetAllSubjects();
        Subject GetById(int id);
        void Update(Subject subject);
    }
}