using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    
   
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KomentarController : ControllerBase
    {

      
        private readonly EdunovaContext _context;

        public KomentarController(EdunovaContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Get()
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var komentari = _context.Komentar.ToList();
                if (komentari == null || komentari.Count = 0)
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
        public IActionResult Post(Komentar komentar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Komentar.Add(komentar);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, komentar);
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

