using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace PoetryHub.Models
{
    // http://www.asp.net/mvc/tutorials/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application
    class PoemRepository : IPoemRepository
    {
        private readonly PoemContext db;

        public PoemRepository(PoemContext db)
        {
            this.db = db;

        }

        public IEnumerable<Poem> FindAll()
        {
            return db.Poems.ToList();
        }

        public Poem Get(int id)
        {
            return db.Poems.Find(id);
        }

        public void Update(Poem poem)
        {
            db.Entry(poem).State = EntityState.Modified;
        }

        public Poem Add(Poem poem)
        {
            return db.Poems.Add(poem);
        }

        public Poem Delete(int id)
        {
            var poem = db.Poems.Find(id);
            if (poem == null)
            {
                return null;
            }
            else
            {
                return db.Poems.Remove(poem);
            }
        }

        public int SaveChanges()
        {
            return db.SaveChanges();
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
