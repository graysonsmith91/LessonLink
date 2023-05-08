using LessonLink.Models;
using LessonLink.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace LessonLink.Repositories
{
    public class LessonRepository : BaseRepository, ILessonRepository
    {
        public LessonRepository(IConfiguration configuration) : base(configuration) { }

        public List<Lesson> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, StudentId, TeacherId, LessonLength, DateTime, Note, isComplete
                            FROM Lesson;";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var allLessons = new List<Lesson>();
                        while (reader.Read())
                        {
                            allLessons.Add(new Lesson()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                StudentId = DbUtils.GetInt(reader, "StudentId"),
                                TeacherId = DbUtils.GetInt(reader, "TeacherId"),
                                LessonLength = DbUtils.GetInt(reader, "LessonLength"),
                                DateTime = DbUtils.GetDateTime(reader, "DateTime"),
                                Note = DbUtils.GetString(reader, "Note"),
                                isComplete = DbUtils.GetBool(reader, "isComplete")
                            });
                        }

                        return allLessons;
                    }
                }
            }
        }

        public Lesson GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT l.Id, l.StudentId, l.TeacherId AS LessonTeacherId, l.LessonLength, l.DateTime, l.Note, l.isComplete,
                              s.FirstName, s.LastName, s.Email
                          FROM Lesson l
                          LEFT JOIN Student s ON s.Id = l.StudentId
                          WHERE l.Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Lesson lesson = null;
                        if (reader.Read())
                        {
                            lesson = new Lesson()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                TeacherId = DbUtils.GetInt(reader, "LessonTeacherId"),
                                LessonLength = DbUtils.GetInt(reader, "LessonLength"),
                                DateTime = DbUtils.GetDateTime(reader, "DateTime"),
                                Note = DbUtils.GetString(reader, "Note"),
                                isComplete = DbUtils.GetBool(reader, "isComplete"),
                                StudentId = DbUtils.GetInt(reader, "StudentId"),
                                Student = new Student()
                                {
                                    Id = DbUtils.GetInt(reader, "StudentId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email= DbUtils.GetString(reader, "Email"),
                                }
                            };
                        }
                        return lesson;
                    }
                }
            }
        }

        public List<Lesson> GetLessonsByTeacherId(int teacherId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT l.Id, l.StudentId, l.TeacherId AS LessonTeacherId, l.LessonLength, l.DateTime, l.Note, l.isComplete,
                              s.FirstName, s.LastName
                       FROM Lesson l
                       LEFT JOIN Student s ON s.Id = l.StudentId
                       WHERE l.TeacherId = @teacherId
                       ORDER BY DateTime;";

                    cmd.Parameters.AddWithValue("@teacherId", teacherId);
                    var reader = cmd.ExecuteReader();

                    var lessons = new List<Lesson>();

                    while (reader.Read())
                    {
                        var lesson = new Lesson()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            TeacherId = DbUtils.GetInt(reader, "LessonTeacherId"),
                            LessonLength = DbUtils.GetInt(reader, "LessonLength"),
                            DateTime = DbUtils.GetDateTime(reader, "DateTime"),
                            Note = DbUtils.GetString(reader, "Note"),
                            isComplete = DbUtils.GetBool(reader, "isComplete"),
                            StudentId = DbUtils.GetInt(reader, "StudentId"),
                            Student = new Student()
                            {
                                Id = DbUtils.GetInt(reader, "StudentId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName")
                            }
                        };
                        lessons.Add(lesson);
                    }

                    reader.Close();

                    return lessons;
                }
            }
        }

        public void Add(Lesson lesson)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Lesson (StudentId, TeacherId, LessonLength, DateTime, Note, isComplete)
                        OUTPUT INSERTED.ID
                        VALUES (@StudentId, @TeacherId, @LessonLength, @DateTime, @Note, @isComplete)";

                    DbUtils.AddParameter(cmd, "@StudentId", lesson.StudentId);
                    DbUtils.AddParameter(cmd, "@TeacherId", lesson.TeacherId);
                    DbUtils.AddParameter(cmd, "@LessonLength", lesson.LessonLength);
                    DbUtils.AddParameter(cmd, "@DateTime", lesson.DateTime);
                    DbUtils.AddParameter(cmd, "@Note", lesson.Note);
                    DbUtils.AddParameter(cmd, "@isComplete", lesson.isComplete);

                    lesson.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Lesson lesson)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Lesson
                           SET StudentId = @studentId,
                               TeacherId = @teacherId,
                               LessonLength = @lessonLength,
                               DateTime = @dateTime,
                               Note = @note,
                               isComplete = @isComplete
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", lesson.Id);
                    DbUtils.AddParameter(cmd, "@studentId", lesson.StudentId);
                    DbUtils.AddParameter(cmd, "@teacherId", lesson.TeacherId);
                    DbUtils.AddParameter(cmd, "@lessonLength", lesson.LessonLength);
                    DbUtils.AddParameter(cmd, "@dateTime", lesson.DateTime);
                    DbUtils.AddParameter(cmd, "@note", lesson.Note);
                    DbUtils.AddParameter(cmd, "@isComplete", lesson.isComplete);

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
                    cmd.CommandText = "DELETE FROM Lesson WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
