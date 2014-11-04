using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

using PoetryHub.Models;

namespace PoetryHub.Controllers
{
    /// <summary>
    /// Allow access to current user's drafts. Also allow fetching by id
    /// for drafts that we may be able to edit.
    /// /drafts
    /// </summary>
    public class PoemController : ApiController
    {
        private IPoemRepository repo;

        public PoemController()
            : this(new PoemRepository(new PoemContext()))
        {

        }

        public PoemController(IPoemRepository repo)
        {
            this.repo = repo;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                repo.Dispose();
            }
            base.Dispose(disposing);
        }

        // GET: /poems returns all poems
        public IEnumerable<Poem> Get()
        {
            return repo.FindAll();
        }

        // GET: /poems/5
        // Get a specific poem.
        [ResponseType(typeof(Poem))]
        public IHttpActionResult Get(int id)
        {
            var item = repo.Get(id);
            if (item == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(item);
            }
        }

        // PUT: /poems/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, Poem poem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            repo.Update(poem);
            if (repo.SaveChanges() > 0)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return NotFound();
            }
        }

        // POST: poems/1
        [ResponseType(typeof(Poem))]
        public IHttpActionResult Post(Poem poem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            /* Snippet which would enable default angularJS resource calls which use POST
             * for both save and update: if (poem.Id > 0)
            { // update
                return await Put(poem.Id, poem);
            }*/

            Poem added = repo.Add(poem);
            if (added != null)
            {
                if (repo.SaveChanges() > 0)
                {
                    return CreatedAtRoute("DefaultApi", new { id = added.Id }, added);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [ResponseType(typeof(Poem))]
        public IHttpActionResult Delete(int id)
        {
            var deleted = repo.Delete(id);
            if (deleted != null)
            {
                if (repo.SaveChanges() > 0)
                {
                    return Ok(deleted);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
