using LessonLink.Models;
using System.Collections.Generic;

namespace LessonLink.Repositories
{
    public interface IStudentRepository
    {
        void Add(Student student);
        void Delete(int id);
        List<Student> GetAll();
        Student GetById(int id);
        List<Student> GetStudentsByTeacherId(int teacherId);
        void Update(Student student);
    }
}