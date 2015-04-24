using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace YbañezNacua.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult Feedback()
        {
            return View();
        }
        public ActionResult Home()
        {
            return View();
        }
        public ActionResult Template(string id)
        {
            switch (id.ToLower())
            {
                case "header":
                    return PartialView("~/Views/Header.cshtml");
                case "footer":
                    return PartialView("~/Views/Footer.cshtml");
                default:
                    throw new Exception("template not known");
            }
        }
    }
}
