using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WebApi.Data;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ObjavaController : ControllerBase

    {
        private readonly EdunovaContext _context;

        public ObjavaController(EdunovaContext context)
        {
            _context = context;
        }
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
            var objave = _context.Objava.ToList();
            if (objave == null || objave.Count == 0)
            {
                return new EmptyResult();
            }
            return new JsonResult(_context.Objava.ToList());

        }
        catch (Exception ex)
        {
            returnStatusCode(StatusCodes.Status503ServiceUnavailable,
                                    ex.Message);
        }
    }

    [HttpPost]

    public IActionResult Post(Objava objava)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            _context.Objava.Add(objava);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, objava);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
        }
    }

    [HttpPut]

    [Route("{sifra:int}")]
    public IActionResult Put(int sifra, Objava objava)
    {
        if (sifra <= 0 || objava = null)
        {
            return BadRequest();
        }
        try
        {
            var objavaBaza = _context.Objava.Find(sifra);
            if (objavaBaza == null)
            {
                return BadRequest();
            }
            objavaBaza.Naslov = objava.Naslov;
            objavaBaza.Opis = objava.Opis;
            objavaBaza.VrijemeIzrade = objava.VrijemeIzrade;
            objavaBaza.IpAdresa = objava.IpAdresa;
            objavaBaza.Osoba = objava.Osoba;
            objavaBaza.Slika = objava.Slika;

            _context.Objava.Update(objavaBaza);
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status200OK, objavaBaza);


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
        var objavaBaza = _context.Objava.Find(sifra);
        if (objavaBaza == null)
        {
            return BadRequest();
        }
        try
        {
            _context.Objava.Remove(objavaBaza);
            _context.SaveChanges();

            return new JsonResult("{\"poruka\":\"Obrisano\"}");
        }
        catch (Exception ex)
        {
            return new JsonResult("{\"poruka\":\"Ne može se obrisati\"}");

        }
    }
}
