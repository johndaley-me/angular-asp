using System.Collections.Generic;
using System.Data.Entity;

namespace PoetryHub.Models
{
    public class PoemContext : DbContext
    {
        public PoemContext() : base("DefaultConnection")
        {

        }

        public DbSet<Poem> Poems { get; set; }
    }

    public class DBInitializer : DropCreateDatabaseAlways<PoemContext>
    {
        protected override void Seed(PoemContext context)
        {
            var poems = new List<Poem>();

            poems.Add(new Poem()
            {
                Title = "Twinkle Twinkle Little Star",
                Content =
                    "Twinkle, twinkle, little star,\n" +
                    "How I wonder what you are.\n" +
                    "Up above the world so high,\n" +
                    "Like a diamond in the sky. "
            });
            poems.Add(new Poem()
            {
                Title = "Hickory Dickory Dock",
                Content =
                    "Hickory Dickory Dock,\n" +
                    "The mouse ran up the clock.\n" +
                    "The clock struck one,\n" +
                    "The mouse ran down!\n" +
                    "Hickory Dickory Dock."
            });
            poems.Add(new Poem()
            {
                Title = "Jack be Nimble",
                Content =
                    "Jack Be Nimble\n" +
                    "Jack, be nimble,\n" +
                    "Jack, be quick,\n" +
                    "Jack, jump over\n" +
                    "The candlestick. Jack jumped high\n" +
                    "Jack jumped low\n" +
                    "Jack jumped over\n" +
                    "and burned his toe."
            });

            foreach (var poem in poems)
            {
                context.Poems.Add(poem);
            }
            base.Seed(context);
        }
    }
}