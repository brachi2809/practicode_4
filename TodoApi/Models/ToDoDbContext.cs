using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).HasMaxLength(100);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
