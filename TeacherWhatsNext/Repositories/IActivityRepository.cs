using Microsoft.Extensions.Hosting;
using System.Collections.Generic;

namespace TeacherWhatsNext
{
    public interface IActivityRepository
    {
        public List<Activity> GetAll();
        public Activity GetById(int id);
        //public List<Activity> GetByUser(int userId);
        public void Insert(Activity activity);
        public void Update(Activity activity);
        public void Delete(int id);
    }
}