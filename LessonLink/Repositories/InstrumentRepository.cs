using LessonLink.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using LessonLink.Models;

namespace LessonLink.Repositories
{
    public class InstrumentRepository : BaseRepository, IInstrumentRepository
    {
        public InstrumentRepository(IConfiguration config) : base(config) { }
        public List<Instrument> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name] FROM Instrument ORDER BY name ASC";
                    var reader = cmd.ExecuteReader();

                    var instruments = new List<Instrument>();

                    while (reader.Read())
                    {
                        instruments.Add(new Instrument()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                        });
                    }

                    reader.Close();

                    return instruments;
                }
            }
        }

        public Instrument GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Name]
                        FROM Instrument
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    return new Instrument { Id = id, Name = (string)cmd.ExecuteScalar() };
                }
            }
        }

        public List<Instrument> GetInstrumentsByTeacherId(int teacherId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ti.Id, ti.InstrumentId, ti.TeacherId, i.Id AS InstrumentId, i.Name AS InstrumentName
                        FROM TeacherInstrument ti
                        LEFT JOIN Instrument i ON i.Id = ti.InstrumentId
                        WHERE TeacherId = @teacherId;";

                    cmd.Parameters.AddWithValue("@teacherId", teacherId);

                    var reader = cmd.ExecuteReader();

                    var instruments = new List<Instrument>();

                    while (reader.Read())
                    {
                        instruments.Add(new Instrument()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("InstrumentId")),
                            Name = reader.GetString(reader.GetOrdinal("InstrumentName"))
                        });
                    }
                    reader.Close();

                    return instruments;
                }
            }
        }

        public void Add(Instrument instrument)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Instrument ([Name])
                    OUTPUT INSERTED.ID
                    VALUES (@name);
                ";

                    cmd.Parameters.AddWithValue("@name", instrument.Name);

                    int id = (int)cmd.ExecuteScalar();

                    instrument.Id = id;
                }
            }
        }

        public void Update(Instrument instrument)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Instrument
                            SET 
                                [Name] = @name
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", instrument.Name);
                    cmd.Parameters.AddWithValue("@id", instrument.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int instrumentId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Instrument
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", instrumentId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}