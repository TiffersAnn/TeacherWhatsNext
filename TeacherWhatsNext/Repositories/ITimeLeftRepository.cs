using System.Collections.Generic;
using TeacherWhatsNext.Models;

namespace TeacherWhatsNext.Repositories
{
    public interface ITimeLeftRepository
    {
        void Add(TimeLeft timeLeft);
        void Delete(int id);
        List<TimeLeft> GetAllTimes();
        TimeLeft GetById(int id);
        void Update(TimeLeft timeLeft);
    }
}