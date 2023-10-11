namespace WebApi.Models
{
    public class Komentar : Entitet
    {
        public DateTime? VrijemeKomentiranja { get; set; }
        public string? Opis { get; set; }
       
        public Objava Objava { get; set; }
        public Osoba Osoba { get; set; }
    }
}
