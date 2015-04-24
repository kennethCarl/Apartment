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
    public class Contact_FormController : ApiController
    {
        private ApartmentEntities db = new ApartmentEntities();

        // GET: api/Contact_Form
        public IQueryable<Contact_Form> GetContact_Form()
        {
            return db.Contact_Form;
        }

        // GET: api/Contact_Form/5
        [ResponseType(typeof(Contact_Form))]
        public IHttpActionResult GetContact_Form(long id)
        {
            Contact_Form contact_Form = db.Contact_Form.Find(id);
            if (contact_Form == null)
            {
                return NotFound();
            }

            return Ok(contact_Form);
        }

        // PUT: api/Contact_Form/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContact_Form(long id, Contact_Form contact_Form)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact_Form.id)
            {
                return BadRequest();
            }

            db.Entry(contact_Form).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Contact_FormExists(id))
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

        // POST: api/Contact_Form
        [ResponseType(typeof(Contact_Form))]
        public IHttpActionResult PostContact_Form(Contact_Form contact_Form)
        {
            Response response = new Response();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                //exclude html tag
                contact_Form.name = Regex.Replace(contact_Form.name, @"<[^>]+>|&nbsp;", "").Trim();
                if (contact_Form.emailaddress != "")
                {
                    contact_Form.emailaddress = Regex.Replace(contact_Form.emailaddress, @"<[^>]+>|&nbsp;", "").Trim();
                }
                contact_Form.phoneno = Regex.Replace(contact_Form.phoneno, @"<[^>]+>|&nbsp;", "").Trim();
                contact_Form.messages = Regex.Replace(contact_Form.messages, @"<[^>]+>|&nbsp;", "").Trim();

                //send email
                GMailer.GmailUsername = "YbanezNacuaApartment@gmail.com";
                GMailer.GmailPassword = "arjocamahamage";

                GMailer mailer = new GMailer();

                mailer.ToEmail = "kennethcarlybanez@gmail.com";
                mailer.Subject = "Contact Form";
                mailer.Body = "Name: " + contact_Form.name + "<br> Email Address: " + contact_Form.emailaddress + "<br> Phone number: " + contact_Form.phoneno + "<br> Message or Inquiries: " + contact_Form.messages;
                mailer.IsHtml = true;
                mailer.Send();

                //save contact_form
                //contact_Form.date = DateTime.Now;
                //db.Contact_Form.Add(contact_Form);
                //db.SaveChanges();
                response.status = "SUCCESS";
                response.param1 = "Thank you for communicating with us, we will contact you as soon as possible.";
            }
            catch (Exception e)
            {
                response.status = "FAILED";
                response.param1 = "Gmailer";
                response.param2 = "Error:" + e;
            }
            return Ok(response);
        }

        // DELETE: api/Contact_Form/5
        [ResponseType(typeof(Contact_Form))]
        public IHttpActionResult DeleteContact_Form(long id)
        {
            Contact_Form contact_Form = db.Contact_Form.Find(id);
            if (contact_Form == null)
            {
                return NotFound();
            }

            db.Contact_Form.Remove(contact_Form);
            db.SaveChanges();

            return Ok(contact_Form);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Contact_FormExists(long id)
        {
            return db.Contact_Form.Count(e => e.id == id) > 0;
        }
    }
}