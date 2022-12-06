using System.Collections.Generic;
using TeacherWhatsNext.Models;

namespace TeacherWhatsNext.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetUserById(int id);
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
    }
}