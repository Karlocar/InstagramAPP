
using Instagram.Data;
using Instagram.Models;
using Microsoft.AspNetCore.Mvc;


namespace Instagram.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class OsobaController : ControllerBase
    {

        private readonly EdunovaContext _context;

        public OsobaController(EdunovaContext context)
        {
            _context = context;
        }
        [HttpGet]
        public ActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var osobe = _context.Osoba.ToList();
                if (osobe == null || osobe.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(_context.Osoba.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }


        }

        [HttpPost]

        public IActionResult Post(Osoba osoba)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Osoba.Add(osoba);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, osoba);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
            }



        }
        [HttpPut]

        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Osoba osoba)
        {
            if (sifra <= 0 || osoba == null)
            {
                return BadRequest();
            }
            try
            {
                var osobaBaza = _context.Osoba.Find(sifra);
                if (osobaBaza == null)
                {
                    return BadRequest();
                }
                osobaBaza.Ime = osoba.Ime;
                osobaBaza.Prezime = osoba.Prezime;
                osobaBaza.Datumrodenja = osoba.Datumrodenja;
                osobaBaza.Korisnickoime = osoba.Korisnickoime;
                osobaBaza.Lozinka = osoba.Lozinka;
                osobaBaza.Slika = osoba.Slika;

                _context.Osoba.Update(osobaBaza);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, osobaBaza);
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
        }
}
