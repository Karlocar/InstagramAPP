

using Instagram.Models;
using Microsoft.EntityFrameworkCore;

namespace Instagram.Data
{

        public class EdunovaContext : DbContext
        {
            public EdunovaContext(DbContextOptions<EdunovaContext> opcije)
            : base(opcije)
            {
            }
            public DbSet<Osoba> Osoba { get; set; }
        }
    
}

