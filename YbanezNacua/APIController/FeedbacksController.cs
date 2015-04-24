using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using YbanezNacua.Models;

namespace YbanezNacua.APIController
{
    public class FeedbacksController : ApiController
    {
        private ApartmentEntities db = new ApartmentEntities();

        //// GET: api/Feedbacks
        //public IQueryable<Feedback> GetFeedbacks()
        //{
        //    var Session = HttpContext.Current.Session;

        //    if (Session["username"] != null)
        //    {
        //        return db.Feedbacks.OrderByDescending(f => f.feedback_date);
        //    }
        //    else
        //        return null;
        //}

        // GET: api/Feedbacks/5
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult GetFeedback(long id)
        {
            Feedback feedback = db.Feedbacks.Find(id);
            if (feedback == null)
            {
                return NotFound();
            }

            return Ok(feedback);
        }
        // GET: api/Feedbacks?date=''&request=''
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult GetFeedback(DateTime? date, string request)
        {
            Response response = new Response();
            MyGenerator generator = new MyGenerator();
            var Session = HttpContext.Current.Session;

            if (request.Equals("from"))
            {
                if (date != null)
                {
                    var feedback = (from f in db.Feedbacks where f.feedback_date > date orderby f.feedback_date descending select f);
                    if (feedback.Count() <= 0)
                        response.status = "FAILED";
                    else
                    {
                        response.status = "SUCCESS";
                        response.intParam1 = feedback.Count();
                        foreach (Feedback f in feedback)
                        {
                            f.username = generator.Decrypt(f.username);
                        }
                        response.objParam1 = feedback.Take(10);
                    }
                }
                else
                {
                    var feedback = (from f in db.Feedbacks orderby f.feedback_date descending select f);
                    if (feedback.Count() <= 0)
                        response.status = "FAILED";
                    else
                    {
                        response.status = "SUCCESS";
                        response.intParam1 = feedback.Count();
                        foreach (Feedback f in feedback)
                        {
                            f.username = generator.Decrypt(f.username);
                        }
                        response.objParam1 = feedback.Take(10);
                    }
                }
                return Ok(response);
            }
            //last
            else
            {
                var feedback = (from f in db.Feedbacks where f.feedback_date < date orderby f.feedback_date descending select f);
                if (feedback == null)
                    response.status = "FAILED";
                else
                {
                    response.status = "SUCCESS";
                    response.intParam1 = feedback.Count();
                    foreach (Feedback f in feedback)
                    {
                        f.username = generator.Decrypt(f.username);
                    }
                    response.objParam1 = feedback.Take(10);
                }
                return Ok(response);
            }

        }

        // PUT: api/Feedbacks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFeedback(long id, Feedback feedback)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != feedback.id)
            {
                return BadRequest();
            }

            db.Entry(feedback).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedbackExists(id))
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

        // POST: api/Feedbacks
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult PostFeedback(Feedback feedback)
        {
            Response response = new Response();
            MyGenerator generator = new MyGenerator();
            var Session = HttpContext.Current.Session;
            //exclude html tag
            feedback.feedback1 = Regex.Replace(feedback.feedback1, @"<[^>]+>|&nbsp;", "").Trim();
            if (!ModelState.IsValid)
            {
                response.status = "FAILED";
                response.param1 = "Error: Bad Request.";
            }
            feedback.username = generator.Encrypt(Session["username"].ToString());
            feedback.feedback_date = DateTime.Now;
            db.Feedbacks.Add(feedback);

            try
            {
                db.SaveChanges();
                response.status = "SUCCESS";
            }
            catch (DbUpdateException e)
            {
                if (FeedbackExists(feedback.id))
                {
                    return Conflict();
                }
                else
                {
                    response.status = "FAILED";
                    response.param1 = "Error: " + e;
                }
            }

            return Ok(response);
        }

        // DELETE: api/Feedbacks/5
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult DeleteFeedback(long id)
        {
            Feedback feedback = db.Feedbacks.Find(id);
            if (feedback == null)
            {
                return NotFound();
            }

            db.Feedbacks.Remove(feedback);
            db.SaveChanges();

            return Ok(feedback);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FeedbackExists(long id)
        {
            return db.Feedbacks.Count(e => e.id == id) > 0;
        }
    }
}