using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using LessonLink.Models;
using LessonLink.Utils;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.Extensions.Hosting;

namespace LessonLink.Repositories
{

    public class StudentRepository : BaseRepository, IStudentRepository
    {
        public StudentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Student> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, FirstName, LastName, GuardianName, Email, InstrumentId, TeacherId
                            FROM Student;";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var allStudents = new List<Student>();
                        while (reader.Read())
                        {
                            allStudents.Add(new Student()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                GuardianName = DbUtils.GetString(reader, "GuardianName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                InstrumentId = DbUtils.GetInt(reader, "InstrumentId"),
                                TeacherId = DbUtils.GetInt(reader, "TeacherId")
                            });
                        }

                        return allStudents;
                    }
                }
            }
        }

        public Student GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT s.Id, s.FirstName, s.LastName, s.GuardianName, s.Email, s.TeacherId, s.InstrumentId, i.Name AS InstrumentName
                          FROM Student s
                          JOIN Instrument i ON i.Id = s.InstrumentId
                          WHERE s.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Student student = null;
                        if (reader.Read())
                        {
                            student = new Student()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                GuardianName = DbUtils.GetString(reader, "GuardianName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                TeacherId = DbUtils.GetInt(reader, "TeacherId"),
                                InstrumentId = DbUtils.GetInt(reader, "InstrumentId"),
                                Instrument = new Instrument()
                                {
                                    Name = DbUtils.GetString(reader, "InstrumentName")
                                }
                            };
                        }
                        return student;
                    }
                }
            }
        }

        public List<Student> GetStudentsByTeacherId(int teacherId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT s.Id, s.FirstName, s.LastName, s.GuardianName, s.Email, s.InstrumentId, s.TeacherId
                       FROM Student s
                       LEFT JOIN Teacher t ON t.Id = s.TeacherId
                       WHERE t.Id = @teacherId
                       ORDER BY s.LastName;";

                    cmd.Parameters.AddWithValue("@teacherId", teacherId);
                    var reader = cmd.ExecuteReader();

                    var students = new List<Student>();

                    while (reader.Read())
                    {
                        var student = new Student()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            GuardianName = reader.GetString(reader.GetOrdinal("GuardianName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            InstrumentId = reader.GetInt32(reader.GetOrdinal("InstrumentId")),
                            TeacherId = reader.GetInt32(reader.GetOrdinal("TeacherId"))
                        };
                        students.Add(student);
                    }

                    reader.Close();

                    return students;
                }
            }
        }

        public void Add(Student student)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Student (FirstName, LastName, GuardianName, Email, InstrumentId, TeacherId)
                        OUTPUT INSERTED.ID
                        VALUES (@FirstName, @LastName, @GuardianName, @Email, @InstrumentId, @TeacherId)";

                    DbUtils.AddParameter(cmd, "@FirstName", student.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", student.LastName);
                    DbUtils.AddParameter(cmd, "@GuardianName", student.GuardianName);
                    DbUtils.AddParameter(cmd, "@Email", student.Email);
                    DbUtils.AddParameter(cmd, "@InstrumentId", student.InstrumentId);
                    DbUtils.AddParameter(cmd, "@TeacherId", student.TeacherId);

                    student.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Student student)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Student
                           SET FirstName = @firstName,
                               LastName = @lastName,
                               GuardianName = @guardianName,
                               Email = @email,
                               InstrumentId = @instrumentId,
                               TeacherId = @teacherId
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", student.Id);
                    DbUtils.AddParameter(cmd, "@firstName", student.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", student.LastName);
                    DbUtils.AddParameter(cmd, "@guardianName", student.GuardianName);
                    DbUtils.AddParameter(cmd, "@email", student.Email);
                    DbUtils.AddParameter(cmd, "@instrumentId", student.InstrumentId);
                    DbUtils.AddParameter(cmd, "@teacherId", student.TeacherId);

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
                    cmd.CommandText = "DELETE FROM Student WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}