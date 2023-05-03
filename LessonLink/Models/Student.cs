using System.ComponentModel.DataAnnotations;

namespace LessonLink.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(30)]
        public string LastName { get; set; }

        [MaxLength(30)]
        public string GuardianName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(99)]
        public string Email { get; set; }

        [Required]
        public int InstrumentId { get; set; }

        [Required]
        public int TeacherId { get; set; }
    }
}
