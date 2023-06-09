﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using LessonLink.Models;
using LessonLink.Utils;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;

namespace LessonLink.Repositories
{

    public class TeacherRepository : BaseRepository, ITeacherRepository
    {
        public TeacherRepository(IConfiguration configuration) : base(configuration) { }

        public List<Teacher> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, FirebaseUserId, FirstName, LastName, Email, UserTypeId, Phone 
                            FROM Teacher;";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var allTeachers = new List<Teacher>();
                        while (reader.Read())
                        {
                            allTeachers.Add(new Teacher()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                Phone= DbUtils.GetString(reader, "Phone")
                            });
                        }

                        return allTeachers;
                    }
                }
            }
        }

        public Teacher GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, FirebaseUserId, FirstName, LastName, Email, UserTypeId, DateCreated
                          FROM Teacher
                          WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Teacher teacher = null;
                        if (reader.Read())
                        {
                            teacher = new Teacher()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                            };
                        }
                        return teacher;
                    }
                }
            }
        }

        public Teacher GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, FirebaseUserId, FirstName, LastName, Email, UserTypeId 
                          FROM Teacher
                          WHERE FirebaseUserId = @firebaseUserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Teacher teacher = null;
                        if (reader.Read())
                        {
                            teacher = new Teacher()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId")
                            };
                        }
                        return teacher;
                    }
                }
            }
        }

        public void Add(Teacher teacher)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Teacher (FirebaseUserId, FirstName, LastName, Email, UserTypeId, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@FirebaseUserId, @FirstName, @LastName, @Email, @UserTypeId, @DateCreated)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", teacher.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", teacher.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", teacher.LastName);
                    DbUtils.AddParameter(cmd, "@Email", teacher.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", teacher.UserTypeId);
                    DbUtils.AddParameter(cmd, "@DateCreated", DateTime.Now);

                    teacher.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Teacher teacher)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Teacher
                           SET FirstName = @firstName,
                               LastName = @lastName,
                               Email = @email,
                               UserTypeId = @userTypeId
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", teacher.Id);
                    DbUtils.AddParameter(cmd, "@firstName", teacher.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", teacher.LastName);
                    DbUtils.AddParameter(cmd, "@email", teacher.Email);
                    DbUtils.AddParameter(cmd, "@userTypeId", teacher.UserTypeId);

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
                    cmd.CommandText = @"
                        DELETE FROM Lesson 
                        WHERE TeacherId = @id

                        DELETE FROM TeacherInstrument
                        WHERE TeacherId = @id

                        DELETE FROM Student
                        WHERE TeacherId = @id
                        
                        DELETE FROM Teacher
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}