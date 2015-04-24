using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using YbanezNacua.Models;

namespace YbanezNacua.APIController
{
    public class VisitedsController : ApiController
    {
        private ApartmentEntities db = new ApartmentEntities();
        Response response = new Response();
        MyGenerator generator = new MyGenerator();
        // GET: api/Visiteds
       [ResponseType(typeof(Visited))]
        public IHttpActionResult GetVisited()
        {
            var visitors = (from v in db.Visiteds select v);
            response.param1 = "SUCCESS";
            response.intParam1 = visitors.Count();

            return Ok(response);
        }
        // GET: api/Visiteds/5
        [ResponseType(typeof(Visited))]
        public IHttpActionResult GetVisited(string id)
        {
            Visited visited = db.Visiteds.Find(id);
            if (visited == null)
            {
                return NotFound();
            }

            return Ok(visited);
        }

        // PUT: api/Visiteds/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVisited(string id, Visited visited)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != visited.ipaddress)
            {
                return BadRequest();
            }

            db.Entry(visited).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VisitedExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Visiteds
        [ResponseType(typeof(Visited))]
        public IHttpActionResult PostVisited(Visited visited)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            visited.ipaddress = visited.ipaddress;
            db.Visiteds.Add(visited);

            try
            {
                db.SaveChanges();
                var visitors = (from v in db.Visiteds select v);
                response.param1 = "SUCCESS";
                response.intParam1 = visitors.Count();
            }
            catch (DbUpdateException e)
            {
                if (VisitedExists(visited.ipaddress))
                {
                    response.param1 = "FAILED";
                }
                else
                {
                    response.param1 = e + "";
                }
            }

            return Ok(response);
        }

        // DELETE: api/Visiteds/5
        [ResponseType(typeof(Visited))]
        public IHttpActionResult DeleteVisited(string id)
        {
            Visited visited = db.Visiteds.Find(id);
            if (visited == null)
            {
                return NotFound();
            }

            db.Visiteds.Remove(visited);
            db.SaveChanges();

            return Ok(visited);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VisitedExists(string id)
        {
            return db.Visiteds.Count(e => e.ipaddress == id) > 0;
        }
        private string GetIPAddress()
        {
            System.Web.HttpContext context = System.Web.HttpContext.Current;

            string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipAddress))
            {
                string[] addresses = ipAddress.Split(',');
                if (addresses.Length != 0)
                {
                    return addresses[0];
                }
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];

        }

    }
}