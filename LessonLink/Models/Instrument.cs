using System.ComponentModel.DataAnnotations;

namespace LessonLink.Models
{
    public class Instrument
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
    }
}
