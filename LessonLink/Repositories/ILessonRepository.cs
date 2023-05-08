using LessonLink.Models;
using System.Collections.Generic;

namespace LessonLink.Repositories
{
    public interface ILessonRepository
    {
        void Add(Lesson lesson);
        void Delete(int id);
        List<Lesson> GetAll();
        Lesson GetById(int id);
        List<Lesson> GetLessonsByTeacherId(int teacherId);
        void Update(Lesson lesson);
    }
}