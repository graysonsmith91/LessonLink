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
        void Update(Instrument instrument);
    }
}