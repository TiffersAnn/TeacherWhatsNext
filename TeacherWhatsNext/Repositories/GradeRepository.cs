using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Diagnostics;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Utils;

namespace TeacherWhatsNext.Repositories
{
    public class GradeRepository : BaseRepository, IGradeRepository
    {
        public GradeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Grade> GetAllGrades()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id,Level
                FROM Grade
                ORDER BY Level";

                    var reader = cmd.ExecuteReader();

                    var grades = new List<Grade>();
                    while (reader.Read())
                    {
                        grades.Add(new Grade()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Level = DbUtils.GetString(reader, "Level"),
                        });
                    }

                    reader.Close();

                    return grades;
                }
            }
        }
        public Grade GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id,Level
                FROM Grade
                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    Grade grade = null;
                    while (reader.Read())
                    {
                        grade = new Grade()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Level = reader.GetString(reader.GetOrdinal("Level")),
                        };
                    }
                    reader.Close();

                    return grade;
                }
            }
        }
        public void Add(Grade grade)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Grade Level
                        OUTPUT INSERTED.ID
                        VALUES @Level";

                    DbUtils.AddParameter(cmd, "@Level", grade.Level);

                    grade.Id = (int)cmd.ExecuteScalar();
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
                            DELETE FROM Grade
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Grade grade)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Grade
                            SET Name = @level
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", grade.Level);
                    cmd.Parameters.AddWithValue("@id", grade.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
