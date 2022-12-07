using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Utils;

namespace TeacherWhatsNext.Repositories
{
    public class TimeLeftRepository : BaseRepository, ITimeLeftRepository
    {
        public TimeLeftRepository(IConfiguration configuration) : base(configuration) { }

        public List<TimeLeft> GetAllTimes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id,Amount
                FROM TimeLeft
                ORDER BY Amount";

                    var reader = cmd.ExecuteReader();

                    var times = new List<TimeLeft>();
                    while (reader.Read())
                    {
                        times.Add(new TimeLeft()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Amount = DbUtils.GetString(reader, "Amount"),
                        });
                    }

                    reader.Close();

                    return times;
                }
            }
        }

        public TimeLeft GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, Amount
                FROM TimeLeft
                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    TimeLeft timeLeft = null;
                    while (reader.Read())
                    {
                        timeLeft = new TimeLeft()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Amount = reader.GetString(reader.GetOrdinal("Amount")),
                        };
                    }

                    reader.Close();

                    return timeLeft;
                }
            }
        }
        public void Add(TimeLeft timeLeft)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO TimeLeft Amount
                        OUTPUT INSERTED.ID
                        VALUES @Amount";

                    DbUtils.AddParameter(cmd, "@Amount", timeLeft.Amount);

                    timeLeft.Id = (int)cmd.ExecuteScalar();
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
                            DELETE FROM TimeLeft
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(TimeLeft timeLeft)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE TimeLeft
                            SET Name = @amount
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@amount", timeLeft.Amount);
                    cmd.Parameters.AddWithValue("@id", timeLeft.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
