using LessonLink.Models;
using System.Collections.Generic;

namespace LessonLink.Repositories
{
    public interface IInstrumentRepository
    {
        void Add(Instrument instrument);
        void Delete(int instrumentId);
        List<Instrument> GetAll();
        Instrument GetById(int id);
        public List<Instrument> GetInstrumentsByTeacherId(int teacherId);
        void Update(Instrument instrument);
    }
}