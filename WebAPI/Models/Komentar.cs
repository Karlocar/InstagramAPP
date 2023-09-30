using Instagram.Models;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Komentar : Entitet
    {
        [Required]

        public DateTime? Vrijemekomentara { get; set; }
        public string? Opis { get; set; }
        public int? Objava { get; set; }
        public string? Osoba { get; set; }
    }
}
