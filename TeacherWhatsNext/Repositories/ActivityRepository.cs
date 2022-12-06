using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using TeacherWhatsNext.Utils;
using System;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Repositories;
using System.Linq;
using System.Diagnostics;

namespace TeacherWhatsNext
{
    public class ActivityRepository : BaseRepository, IActivityRepository
    {
        public ActivityRepository(IConfiguration configuration) : base(configuration) { }

        public List<Activity> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT a.Id, a.Title, a.Content, a.ImageLocation, a.subjectId, a.timeLeftId, a.gradeId, a.UserProfileId, s.name AS Subject, tl.amount, g.level, u.DisplayName
                            FROM Activity a
                            LEFT join subject s on a.subjectId = s.id
                            LEFT join grade g on a.gradeId = g.id
                            LEFT join timeLeft tl on a.timeLeftId = tl.id
                            LEFT join userProfile u on a.userProfileId = u.id;
                            ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Activity> activities = new List<Activity>();
                    while (reader.Read())
                    {
                       Activity activity = new Activity()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                            SubjectId = reader.GetInt32(reader.GetOrdinal("SubjectId")),
                            TimeLeftId = reader.GetInt32(reader.GetOrdinal("TimeLeftId")),
                            GradeId = reader.GetInt32(reader.GetOrdinal("GradeId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                           UserProfile = new UserProfile(),
                           Subject = new Subject(),
                           TimeLeft = new TimeLeft(),
                           Grade = new Grade()

                       };
                        activity.UserProfile.DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"));
                        activity.Subject.Name = reader.GetString(reader.GetOrdinal("Subject"));
                        activity.TimeLeft.Amount = reader.GetString(reader.GetOrdinal("Amount"));
                        activity.Grade.Level = reader.GetString(reader.GetOrdinal("Level"));



                        activities.Add(activity);
                    }

                    reader.Close();

                    return activities;
                }
            }
        }

        public Activity GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT a.Id AS ActivityId, a.Title, a.Content, a.ImageLocation, a.subjectId, a.timeLeftId, a.gradeId, a.UserProfileId, s.name AS Subject, tl.amount, g.level, u.DisplayName
                            FROM Activity a
                            LEFT join subject s on a.subjectId = s.id
                            LEFT join grade g on a.gradeId = g.id
                            LEFT join timeLeft tl on a.timeLeftId = tl.id
                            LEFT join userProfile u on a.userProfileId = u.id
                            WHERE a.Id = @id";
                          
                    cmd.Parameters.AddWithValue("id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    Activity activity = null;
                    if (reader.Read())
                    {
                        activity = new Activity()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("ActivityId")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                            SubjectId = reader.GetInt32(reader.GetOrdinal("SubjectId")),
                            TimeLeftId = reader.GetInt32(reader.GetOrdinal("TimeLeftId")),
                            GradeId = reader.GetInt32(reader.GetOrdinal("GradeId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            UserProfile = new UserProfile(),
                            Subject = new Subject(),
                            TimeLeft = new TimeLeft(),
                            Grade = new Grade()
                        };
                        activity.UserProfile.DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"));
                        activity.Subject.Name = reader.GetString(reader.GetOrdinal("Subject"));
                        activity.TimeLeft.Amount = reader.GetString(reader.GetOrdinal("amount"));
                        activity.Grade.Level = reader.GetString(reader.GetOrdinal("Level"));
                    }

                    reader.Close();

                    return activity;
                }
            }
        }
        public void Insert(Activity activity)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Activity (
                            Title, Content, ImageLocation, SubjectId, timeLeftId, gradeId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @subjectId, @timeLeftId, @gradeId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", activity.Title);
                    cmd.Parameters.AddWithValue("@Content", activity.Content);
                    cmd.Parameters.AddWithValue("@ImageLocation", activity.ImageLocation);
                                                   
                    cmd.Parameters.AddWithValue("@SubjectId", activity.SubjectId);
                    cmd.Parameters.AddWithValue("@timeLeftId", activity.TimeLeftId);
                    cmd.Parameters.AddWithValue("@gradeId", activity.GradeId);
                    cmd.Parameters.AddWithValue("@UserProfileId", activity.UserProfileId);

                    activity.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Activity WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Activity activity)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                {
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"UPDATE Activity
                                                SET Title = @title, 
                                                    Content = @content, 
                                                    ImageLocation = @imageLocation, 
                                                    SubjectId = @subjectId,
                                                    TimeLeftId = @timeLeftId,
                                                    GradeId = @gradeId,
                                                    UserProfileId = @userProfileId
                                                WHERE id  = @id";

                        cmd.Parameters.AddWithValue("@id", activity.Id);
                        cmd.Parameters.AddWithValue("@title", activity.Title);
                        cmd.Parameters.AddWithValue("@content", activity.Content);
                        cmd.Parameters.AddWithValue("@imageLocation", activity.ImageLocation);
                        cmd.Parameters.AddWithValue("@subjectId", activity.SubjectId);
                        cmd.Parameters.AddWithValue("@timeLeftId", activity.TimeLeftId);
                        cmd.Parameters.AddWithValue("@gradeId", activity.GradeId);
                        cmd.Parameters.AddWithValue("@userProfileId", activity.UserProfileId);

                        

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }

    }
}
