namespace Instagram.Models
{
    public class Objava : Entitet
    {
        public string? Naslov { get; set; }
        
        public string?  Opis { get; set; }

        public DateTime? VrijemeIzrade { get; set; }

        public string? IpAdresa { get; set; }

        public Osoba Osoba { get; set; } 
        public string? Slika { get; set; }

    }
}
