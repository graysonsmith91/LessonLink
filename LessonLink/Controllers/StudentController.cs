using System;
using Microsoft.AspNetCore.Mvc;
using LessonLink.Repositories;
using LessonLink.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LessonLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        public StudentController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_studentRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var student = _studentRepository.GetById(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpGet("myStudents/{id}")]
        public IActionResult GetStudentsByTeacherId(int id)
        {
            return
                Ok(_studentRepository.GetStudentsByTeacherId(id));
        }

        [HttpPost]
        public IActionResult Post(Student student)
        {
            _studentRepository.Add(student);
            return CreatedAtAction("Get", new { id = student.Id }, student);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Student student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            _studentRepository.Update(student);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _studentRepository.Delete(id);
            return NoContent();
        }
    }
}