using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Utils;

namespace TeacherWhatsNext.Repositories
{
    public class UserProfileRepository : BaseRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        //public List<UserProfile> GetAll()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                    Select u.Id, u.FirstName, u.LastName, u.DisplayName, u.UserTypeId,
        //                    ut.Id, ut.Name
        //                    From UserProfile u
        //                        Left Join UserType ut ON u.UserTypeId = ut.Id
        //                    Order By u.DisplayName";

        //            var reader = cmd.ExecuteReader();

        //            var users = new List<UserProfile>();
        //            while (reader.Read())
        //            {
        //                users.Add(new UserProfile()
        //                {
        //                    Id = DbUtils.GetInt(reader, "Id"),
        //                    FirstName = DbUtils.GetString(reader, "FirstName"),
        //                    LastName = DbUtils.GetString(reader, "LastName"),
        //                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
        //                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
        //                    UserType = new UserType()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "Id"),
        //                        Name = DbUtils.GetString(reader, "Name")
        //                    },
        //                });
        //            }

        //            reader.Close();

        //            return users;

        //        }
        //    }
        //}
    }
}
