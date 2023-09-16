
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

        
        

            
        
    }
}
