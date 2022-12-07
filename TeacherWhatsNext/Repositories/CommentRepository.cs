using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using TeacherWhatsNext.Models;

namespace TeacherWhatsNext.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Subject, Content, UserProfileId as CommentUserProfileId, ActivityId AS CommentActivityId
                                        FROM Comment 
                                        ";


                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Comment> comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("CommentUserProfileId")),
                            ActivityId = reader.GetInt32(reader.GetOrdinal("CommentActivityId"))


                        });

                    }
                    reader.Close();
                    return comments;
                }
            }
        }
        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Subject, Content, UserProfileId as CommentUserProfileId, ActivityId AS CommentActivityId
                                        FROM Comment 
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Comment comment = new Comment
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("CommentUserProfileId")),
                            ActivityId = reader.GetInt32(reader.GetOrdinal("CommentActivity"))


                        };
                        reader.Close();
                        return comment;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
        public void AddComment(Comment newComment)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    INSERT INTO Comment(Subject, Content, UserProfileId, ActivityId)
                                    OUTPUT INSERTED.ID
                                    VALUES (@subject, @content, @userProfileId, @activityId, )";
                    cmd.Parameters.AddWithValue("@subject", newComment.Subject);
                    cmd.Parameters.AddWithValue("@content", newComment.Content);
                    cmd.Parameters.AddWithValue("@userProfileId", newComment.UserProfileId);
                    cmd.Parameters.AddWithValue("@activityId", newComment.ActivityId);


                    newComment.Id = (int)cmd.ExecuteScalar();
                }

            }
        }
        public void DeleteComment(int commentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Comment WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", commentId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void EditComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Comment 
                                       SET Subject = @subject,
                                           Content = @content
                                       WHERE Id = @commentId";


                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@commentId", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
