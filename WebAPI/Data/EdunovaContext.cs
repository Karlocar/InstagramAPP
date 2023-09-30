using Instagram.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace WebAPI.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> opcije)
           : base(opcije) { 
        }
        public DbSet<Osoba> Osoba { get; set; }
        public DbSet<Komentar> Komentar { get; set; }
        public DbSet<Objava> Objava { get; set; }
        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Komentar>().HasOne(g => g.Osoba);
            modelBuilder.Entity<Komentar>().HasOne(g => g.Objava);
        }
    }
}
    
