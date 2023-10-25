using System.ComponentModel.DataAnnotations;

namespace Instagram.Models
{
    public class Osoba : Entitet
    {
        [Required]
        public string? Ime { get; set; }
        [Required]
        public string? Prezime { get; set; }
        public DateTime? Datumrodenja { get; set; }
        public string? Korisnickoime { get; set; }
        public string? Lozinka { get; set; }
        public string? Slika { get; set; }
    }
}

