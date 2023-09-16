using Instagram.Models;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Komentar : Entitet
    {
        [Required]

        public DateTime? Vrijemekomentara { get; set; }
        public string? opis { get; set; }
        public int? objava { get; set; }
        public string? osoba { get; set; }
    }
}
