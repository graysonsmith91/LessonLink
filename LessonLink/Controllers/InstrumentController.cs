using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using LessonLink.Models;
using LessonLink.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace LessonLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class InstrumentController : ControllerBase
    {
        private readonly IInstrumentRepository _instrumentRepository;
        public InstrumentController(IInstrumentRepository instrumentRepository)
        {
            _instrumentRepository = instrumentRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_instrumentRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var instrument = _instrumentRepository.GetById(id);
            if (instrument != null)
            {
                NotFound();
            }
            return Ok(instrument);
        }

        [HttpGet("teacherInstruments/{id}")]
        public IActionResult GetInstrumentsByTeacherId(int id)
        {
            return
                Ok(_instrumentRepository.GetInstrumentsByTeacherId(id));
        }

        [HttpPost]
        public IActionResult Post(Instrument instrument)
        {
            _instrumentRepository.Add(instrument);
            return CreatedAtAction(nameof(Get), new { id = instrument.Id }, instrument);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Instrument instrument)
        {
            _instrumentRepository.Update(instrument);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _instrumentRepository.Delete(id);
            return NoContent();
        }

        [HttpPost("TeacherInstrument")]
        public IActionResult Post(TeacherInstrument teacherInstrument)
        {
            _instrumentRepository.AddTeacherInstrument(teacherInstrument);
            return CreatedAtAction("Get", new { id = teacherInstrument.Id }, teacherInstrument);
        }

        [HttpDelete("TeacherInstrument")]
        public IActionResult Delete(TeacherInstrument teacherInstrument)
        {
            _instrumentRepository.DeleteTeacherInstrument(teacherInstrument);
            return NoContent();
        }
    }
}