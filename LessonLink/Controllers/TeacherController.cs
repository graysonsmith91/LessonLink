using System;
using Microsoft.AspNetCore.Mvc;
using LessonLink.Repositories;
using LessonLink.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LessonLink.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherRepository _teacherRepository;
        public TeacherController(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_teacherRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var teacher = _teacherRepository.GetById(id);
            if (teacher == null)
            {
                return NotFound();
            }
            return Ok(teacher);
        }

        [HttpGet("Firebase/{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var teacher = _teacherRepository.GetByFirebaseUserId(firebaseUserId);
            if (teacher == null)
            {
                return NotFound();
            }
            return Ok(teacher);
        }

        [HttpPost]
        public IActionResult Post(Teacher teacher)
        {
            _teacherRepository.Add(teacher);
            return CreatedAtAction("Get", new { id = teacher.Id }, teacher);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Teacher teacher)
        {
            if (id != teacher.Id)
            {
                return BadRequest();
            }

            _teacherRepository.Update(teacher);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _teacherRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var teacher = GetCurrentUser();
            if (teacher == null)
            {
                return NotFound();
            }

            return Ok(teacher);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var teacher = _teacherRepository.GetByFirebaseUserId(firebaseUserId);
            if (teacher == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost("Register")]
        public IActionResult Register(Teacher teacher)
        {
            _teacherRepository.Add(teacher);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = teacher.FirebaseUserId }, teacher);
        }

        private Teacher GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _teacherRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}