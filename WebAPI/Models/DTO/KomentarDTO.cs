using Instagram.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Instagram.Models.DTO
{
    public class KomentarDTO

    {
        public int KomentarSifra { get; set; }
        public DateTime? VrijemeKomentiranja { get; set; }
        public int Opis { get; set; }

        public string Objava { get; set; }
       
        public int objava { get; set; }

        public string   Osoba { get; set; }
       
        public int osoba { get; set; }
    }
}
