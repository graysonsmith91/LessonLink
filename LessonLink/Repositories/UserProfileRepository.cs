using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using LessonLink.Models;
using LessonLink.Utils;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace LessonLink.Repositories
{

    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name, Email, ImageUrl, DateCreated 
                            FROM UserProfile;";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var allUsers = new List<UserProfile>();
                        while (reader.Read())
                        {
                            allUsers.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                            });
                        }

                        return allUsers;
                    }
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name, Email, ImageUrl, DateCreated 
                          FROM UserProfile
                          WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        UserProfile userProfile = null;
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                            };
                        }
                        return userProfile;
                    }
                }
            }
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, FirebaseUserId, Name, Email, ImageUrl, DateCreated 
                          FROM UserProfile
                          WHERE FirebaseUserId = @firebaseUserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        UserProfile userProfile = null;
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                            };
                        }
                        return userProfile;
                    }
                }
            }
        }

        public UserProfile GetUserByIdWithVideos(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT  u.Id AS UserId, u.Name, u.Email, u.ImageUrl AS UserProfileImageUrl, u.DateCreated AS UserProfileDateCreated,
                                  v.Id AS VideoId, v.Title, v.Description, v.Url, v.DateCreated AS VideoDateCreated, v.UserProfileId AS VideoUserProfileId 
                          FROM UserProfile u
                          LEFT JOIN Video v ON v.UserProfileId = u.Id 
                          WHERE u.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile userProfile = null;
                        while (reader.Read())
                        {
                            var userId = DbUtils.GetInt(reader, "UserId");

                            if (userProfile == null)
                            {
                                userProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
                                    DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                    Videos = new List<Video>()
                                };
                            }

                            if (DbUtils.IsNotDbNull(reader, "VideoId"))
                            {
                                userProfile.Videos.Add(new Video()
                                {
                                    Id = DbUtils.GetInt(reader, "VideoId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    Url = DbUtils.GetString(reader, "Url"),
                                    DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
                                    UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId")
                                });
                            }
                        }
                        return userProfile;
                    }
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (FirebaseUserId, Name, Email, ImageUrl, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@FirebaseUserId, @Name, @Email, @ImageUrl, @DateCreated)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                           SET Name = @name,
                               Email = @email,
                               ImageUrl = @imageUrl,
                               DateCreated = @dateCreated
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);
                    DbUtils.AddParameter(cmd, "@name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@imageUrl", userProfile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@dateCreated", userProfile.DateCreated);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserProfile WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}