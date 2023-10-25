using System.ComponentModel.DataAnnotations.Schema;

namespace Instagram.Models
{
    public class Komentar : Entitet
    {
        
        public DateTime? VrijemeKomentiranja { get; set; }
        public int? Opis { get; set; }
        [ForeignKey("objava")]
        public Objava Objava { get; set; }
        [ForeignKey("osoba")]
        public Osoba Osoba { get; set; }
    }
}
