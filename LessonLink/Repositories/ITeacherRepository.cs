using LessonLink.Models;
using System.Collections.Generic;

namespace LessonLink.Repositories
{
    public interface ITeacherRepository
    {
        void Add(Teacher teacher);
        void Delete(int id);
        List<Teacher> GetAll();
        Teacher GetByFirebaseUserId(string firebaseUserId);
        Teacher GetById(int id);
        void Update(Teacher teacher);
    }
}