using System;
using System.ComponentModel.DataAnnotations;

namespace LessonLink.Models
{
    public class Lesson
    {
        public int Id { get; set; }

        [Required]
        public int LessonLength { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Note { get; set; }

        public bool isComplete { get; set; }

        [Required]
        public int TeacherId { get; set; }

        [Required]
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
