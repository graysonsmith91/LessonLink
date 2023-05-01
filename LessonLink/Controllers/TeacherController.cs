using System;
using Microsoft.AspNetCore.Mvc;
using LessonLink.Repositories;
using LessonLink.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LessonLink.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherRepository _userProfileRepository;
        public TeacherController(ITeacherRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var video = _userProfileRepository.GetById(id);
            if (video == null)
            {
                return NotFound();
            }
            return Ok(video);
        }

        [HttpGet("Firebase/{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("Videos/{id}")]
        public IActionResult GetUserByIdWithVideos(int id)
        {
            var userProfile = _userProfileRepository.GetUserByIdWithVideos(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Post(Teacher userProfile)
        {
            userProfile.DateCreated = DateTime.Now;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Teacher userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(userProfile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var userProfile = GetCurrentUserProfile();
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        //[HttpPost("Register")]
        //public IActionResult Register(UserProfile userProfile)
        //{
        //    // All newly registered users start out as a "user" user type (i.e. they are not admins)
        //    // userProfile.UserTypeId = UserType.USER_TYPE_ID;
        //    userProfile.DateCreated = DateTime.Now;
        //    _userProfileRepository.Add(userProfile);
        //    return CreatedAtAction(
        //        nameof(GetByFirebaseUserId), new { firebaseUserId = userProfile.FirebaseUserId }, userProfile);
        //}

        private Teacher GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}