using LessonLink.Models;
using LessonLink.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LessonLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonRepository _lessonRepository;
        public LessonController(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_lessonRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var student = _lessonRepository.GetById(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpGet("myLessons/{id}")]
        public IActionResult GetLessonsByTeacherId(int id)
        {
            return
                Ok(_lessonRepository.GetLessonsByTeacherId(id));
        }

        [HttpPost]
        public IActionResult Post(Lesson lesson)
        {
            lesson.isComplete = false;
            _lessonRepository.Add(lesson);
            return CreatedAtAction("Get", new { id = lesson.Id }, lesson);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Lesson lesson)
        {
            if (id != lesson.Id)
            {
                return BadRequest();
            }

            _lessonRepository.Update(lesson);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _lessonRepository.Delete(id);
            return NoContent();
        }
    }
}
