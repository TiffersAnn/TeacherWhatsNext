using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Utils;

namespace TeacherWhatsNext.Repositories
{
    public class SubjectRepository : BaseRepository, ISubjectRepository
    {
        public SubjectRepository(IConfiguration configuration) : base(configuration) { }

        public List<Subject> GetAllSubjects()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id,[Name]
                FROM Subject
                ORDER BY [Name]";

                    var reader = cmd.ExecuteReader();

                    var subjects = new List<Subject>();
                    while (reader.Read())
                    {
                        subjects.Add(new Subject()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return subjects;
                }
            }
        }
        public Subject GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id,[Name]
                FROM Subject
                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    Subject subject = null;
                    while (reader.Read())
                    {
                        subject = new Subject()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        };
                    }

                    reader.Close();

                    return subject;
                }
            }
        }
        public void Add(Subject subject)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Subject (Name)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", subject.Name);

                    subject.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Subject
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Subject subject)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Subject
                            SET Name = @name
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", subject.Name);
                    cmd.Parameters.AddWithValue("@id", subject.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
