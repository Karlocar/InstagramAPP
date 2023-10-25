using Microsoft.AspNetCore.Mvc;
using Instagram.Data;
using Instagram.Models;
using Microsoft.EntityFrameworkCore;
using Instagram.Models.DTO;

namespace Instagram.Controllers
{
    
   
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KomentarController : ControllerBase
    {

      
        private readonly EdunovaContext _context;
        private readonly ILogger<KomentarController> _logger;

        public KomentarController(EdunovaContext context, ILogger<KomentarController> logger)
        {
            _context = context;
            _logger = logger;
        }
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Dohvaćam komentare");
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var komentari=_context.Komentar
                    .Include(s=>s.Osoba)
                    .Include(s=> s.Objava)
                    .ToList();
                
                if (komentari == null || komentari.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(_context.Komentar.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                    ex.Message);
            }



        }


      [HttpPost]
        public IActionResult Post(KomentarDTO komentarDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (komentarDTO.KomentarSifra<=0)
            {
                return BadRequest();
            }

            try
            {
                var komentar = _context.Komentar.Find(komentarDTO.KomentarSifra);
                if (komentar == null)
                {
                    return BadRequest("{\"poruka\":\"Nema komentara s tom sifrom\"}");
                }
                Komentar k = new()
                {

                    VrijemeKomentiranja = komentarDTO.VrijemeKomentiranja,
                    
                };
                _context.Komentar.Add(k);
                _context.SaveChanges();

                return Ok(komentarDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
            }



        }




      
       
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Komentar komentar)
        {

            if (sifra <= 0 || komentar == null)
            {
                return BadRequest();
            }

            try
            {
                var komentarBaza = _context.Komentar.Find(sifra);
                if (komentarBaza == null)
                {
                    return BadRequest();
                }
               
                komentarBaza.VrijemeKomentiranja = komentar.VrijemeKomentiranja;
                komentarBaza.Opis = komentar.Opis;
                komentarBaza.Objava = komentar.Objava;
                komentarBaza. Osoba = komentar.Osoba;
                

                _context.Komentar.Update(komentarBaza);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, komentarBaza);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                  ex);
            }

        }
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return BadRequest();
            }

            var komentarBaza = _context.Komentar.Find(sifra);
            if (komentarBaza == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Komentar.Remove(komentarBaza);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\":\"Obrisano\"}");

            }
            catch (Exception ex)
            {

                return new JsonResult("{\"poruka\":\"Ne može se obrisati\"}");

            }
        }
    }
}

