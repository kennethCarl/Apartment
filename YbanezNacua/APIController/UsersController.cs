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
    public class UsersController : ApiController
    {
        private ApartmentEntities db = new ApartmentEntities();
 
        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users?parameter=something&request=something
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(string parameter, string request)
        {
            string header, body, footer;
            var Session = HttpContext.Current.Session;
            MyGenerator generator = new MyGenerator();
            Response response = new Response();
            
            if (request.Equals("login"))
            {
                //exclude html tag
                parameter = Regex.Replace(parameter, @"<[^>]+>|&nbsp;", "").Trim();
                var searchUser = db.Users.Find(generator.Encrypt(parameter));
                if (searchUser == null)
                    return Ok(searchUser);
                else
                {
                    if(searchUser.isActivate == 1)
                    {
                    //create session username
                        if (Session != null)
                        {
                            if (Session["username"] == null)
                                Session["username"] = parameter;
                        }
                    }
                    searchUser.username = generator.Decrypt(searchUser.username);
                    searchUser.password = generator.Decrypt(searchUser.password);
                    return Ok(searchUser);
                }
            }
            else if (request.Equals("CheckIfLogged"))
            {
                if (Session != null)
                {
                    if (Session["username"] != null)
                    {
                        response.status = "SUCCESS";
                        response.param1 = Session["username"].ToString();
                    }
                    else
                        response.status = "FAILED";

                    return Ok(response);
                }
                else
                    response.status = "FAILED";

                return Ok(response);
            }
            //logout
            else if (request.Equals("logout"))
            {
                Session.Remove("username");
                response.status = "SUCCESS";
                return Ok(response);
            }
            else if (request.Equals("forgotPassword"))
            {
                //exclude html tag
                parameter = Regex.Replace(parameter, @"<[^>]+>|&nbsp;", "").Trim();
                parameter = generator.Encrypt(parameter);
                var searchEmail = db.Users.Where(u => u.emailaddress.Equals(parameter)).ToList();
                if (searchEmail.Count() == 0)
                {
                    response.status = "FAILED";
                    response.param1 = "Email address is not found.";
                }
                else
                {
                    try
                    {
                        //send email
                        GMailer.GmailUsername = "YbanezNacuaApartment@gmail.com";
                        GMailer.GmailPassword = "arjocamahamage";

                        GMailer mailer = new GMailer();
                        foreach (User u in searchEmail)
                        {
                            header = "Hi " + generator.Decrypt(u.username) + "<br><br>" + "Good Day! <br> <br>";
                            body = "Your password is: " + generator.Decrypt(u.password) + ".<br>Thank you and God Bless! <br> <br>";
                            footer = "Yours Truly, <br> Nacua-Ybañez Apartment";
                            mailer.ToEmail = generator.Decrypt(u.emailaddress);
                            mailer.Subject = "Forgot Password";
                            mailer.Body = header + body + footer;
                            mailer.IsHtml = true;
                            mailer.Send();
                        }
                        response.status = "SUCCESS";
                        response.param1 = "Your password has been sent to your email address.";
                    }
                    catch (Exception e)
                    {
                        response.status = "FAILED";
                        response.param1 = "Gmailer";
                        response.param2 = "Error:" + e;
                    }

                } 
                return Ok(response);          
            }
            else //if (request.Equals("forgotActivatorCode"))
            {
                //exclude html tag
                parameter = Regex.Replace(parameter, @"<[^>]+>|&nbsp;", "").Trim();
                parameter = generator.Encrypt(parameter);
                var searchEmail = db.Users.Where(u => u.emailaddress.Equals(parameter)).ToList();
                if (searchEmail.Count() == 0)
                {
                    response.status = "FAILED";
                    response.param1 = "Email address is not found.";
                }
                else
                {
                    try
                    {
                        //send email
                        GMailer.GmailUsername = "YbanezNacuaApartment@gmail.com";
                        GMailer.GmailPassword = "arjocamahamage";

                        GMailer mailer = new GMailer();
                        foreach (User u in searchEmail)
                        {
                            header = "Hi " + generator.Decrypt(u.username) + "<br><br>" + "Good Day! <br> <br>";
                            body = "Your Activator Code is: " + generator.Decrypt(u.generatedCode) + ".<br>Thank you and God Bless! <br> <br>";
                            footer = "Yours Truly, <br> Nacua-Ybañez Apartment";
                            mailer.ToEmail = generator.Decrypt(u.emailaddress);
                            mailer.Subject = "Forgot Activator Code";
                            mailer.Body = header + body + footer;
                            mailer.IsHtml = true;
                            mailer.Send();
                        }
                        response.status = "SUCCESS";
                        response.param1 = "Your Activator Code has been sent to your email address.";
                    }
                    catch (Exception e)
                    {
                        response.status = "FAILED";
                        response.param1 = "Gmailer";
                        response.param2 = "Error:" + e;
                    }

                }
                return Ok(response);
            }
        }

        // PUT: api/Users?updateUser=something&code=something&request=something
        [ResponseType(typeof(User))]
        public IHttpActionResult PutUser(string updateUser, string code, string request, User user)
        {
            var Session = HttpContext.Current.Session;
            MyGenerator generator = new MyGenerator();
            Response response = new Response();
            updateUser = Regex.Replace(updateUser, @"<[^>]+>|&nbsp;", "").Trim();
            User searchuser = db.Users.Find(generator.Encrypt(updateUser));
            if (request.Equals("login"))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (searchuser == null)
                {
                    user.username = "FAILED";
                    return Ok(user);
                }
                if (!(generator.Encrypt(code).Equals(searchuser.generatedCode)))
                {
                    user.username = "INVALID";
                    return Ok(user);
                }
                searchuser.isActivate = 1;
                searchuser.status = 1;
                db.Entry(searchuser).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                    //create session username
                    if (Session != null)
                    {
                        if (Session["username"] == null && request.Equals("login"))
                            Session["username"] = updateUser;
                    }
                    return Ok(user);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(updateUser))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            //changePassword
            else
            {
                user.username = Regex.Replace(user.username, @"<[^>]+>|&nbsp;", "").Trim();//as old password
                user.password = Regex.Replace(user.password, @"<[^>]+>|&nbsp;", "").Trim();// as new password
                user.generatedCode = Regex.Replace(user.generatedCode, @"<[^>]+>|&nbsp;", "").Trim(); // as generatedCode

                if (searchuser == null) {
                    response.status = "FAILED";
                    response.param1 = "User not found";
                }
                //check if inputted old password is equal to users old password in db
                else if (!(searchuser.password.Equals(generator.Encrypt(user.username)))) {
                    response.status = "FAILED";
                    response.param1 = "Old password doesn't match, please input again.";
                }
                //check if inputted generatedCode is equal to users generatedCode in db
                else if(!(searchuser.generatedCode.Equals(generator.Encrypt(user.generatedCode)))) {
                    response.status = "FAILED";
                    response.param1 = "Activator code doesn't match, please input again.";
                }
                //update password here
                else {
                    searchuser.password = generator.Encrypt(user.password);
                    db.Entry(searchuser).State = EntityState.Modified;
                    db.SaveChanges();
                    response.status = "SUCCESS";
                    response.param1 = "Password has been changed, please re-login.";

                }
                return Ok(response);
            }
        }

        // POST: api/Users?parameter=something
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(/*string parameter,*/ User user)
        {
            string header, body, footer, code;
            
            Response response = new Response();
            MyGenerator generate = new MyGenerator();
            code = generate.generateCode(5);

            //exclude html tag
            user.username = Regex.Replace(user.username, @"<[^>]+>|&nbsp;", "").Trim();
            user.password = Regex.Replace(user.password, @"<[^>]+>|&nbsp;", "").Trim();
            user.emailaddress = Regex.Replace(user.emailaddress, @"<[^>]+>|&nbsp;", "").Trim();
            user.contactno = Regex.Replace(user.contactno, @"<[^>]+>|&nbsp;", "").Trim();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var searchEmail = db.Users.Where(u => u.emailaddress.Equals(user.emailaddress)).ToList();
            if (searchEmail.Count() > 0)
            {
                response.status = "FAILED";
                response.param1 = "Email Address is already used.";
                return Ok(response);
            }
            try
            {
                //send email
                GMailer.GmailUsername = "YbanezNacuaApartment@gmail.com";
                GMailer.GmailPassword = "arjocamahamage";

                GMailer mailer = new GMailer();

                header = "Hi " + user.username + "<br><br>" + "Good Day! <br> <br>";
                body = "For security purposes , please use this code: " + code + ".<br>Thank you and God Bless! <br> <br>";
                footer = "Yours Truly, <br> Nacua-Ybañez Apartment";
                mailer.ToEmail = user.emailaddress;
                mailer.Subject = "Activation Code";
                mailer.Body = header + body + footer;
                mailer.IsHtml = true;
                mailer.Send();

                //save user info;
                user.username = generate.Encrypt(user.username.ToString());
                user.password = generate.Encrypt(user.password.ToString());
                user.emailaddress = generate.Encrypt(user.emailaddress.ToString());
                user.contactno = generate.Encrypt(user.contactno.ToString());
                user.registration_date = DateTime.Now;
                user.generatedCode = generate.Encrypt(code);
                user.isActivate = 0;
                user.status = 0;
                db.Users.Add(user);
                db.SaveChanges();
                response.status = "SUCCESS";

            }
            catch (Exception e)
            {
                response.status = "FAILED";
                response.param1 = "Gmailer";
                response.param2 = "Error: " + e;
            }
            return Ok(response);
            //change password
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(String userName)
        {
            User user = db.Users.Find(userName);
            if (user == null)
            {
                return NotFound();
            }
            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(string username)
        {
            return db.Users.Count(e => e.username == username) > 0;
        }
    }
}