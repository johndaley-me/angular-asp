using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System.Net.Http;
using System.Configuration;

using System.Diagnostics;
using System.Net;

namespace PoetryHub.Controllers
{
    /// <summary>
    /// Single Page App Routes. All valid routes get routed to / for the client to handle.
    /// </summary>
    public class AppController : Controller
    {
        public AppController()
        {
        }

        // see http://attributerouting.net/ for help on routes
        [Route(Name = "Home")] // default route at /
        // Other valid routes to go home for AngularJS routing engine to handle
        [Route("createDraft")]
        [Route("poems")]
        [Route("draft/{id}/{title?}")]
        [Route("poem/{id}/{title?}")]
        public ActionResult Index()
        {
            ViewBag.ShowSplash = true; // _Home adjusts accordingly
            return View();
        }

        // you can serve .cshtml in an AngularJS app instead of .html with a route such as this.
        // Your view files will not be inside the App directory
        // since MVC by convention is setup for view files in the View directory
        [Route("template/{id}")]
        public ViewResult Template(string id)
        {
            ViewBag.ShowSplash = false; // _Home adjusts accordingly
            return View(id, null, null);
        }
    }
}