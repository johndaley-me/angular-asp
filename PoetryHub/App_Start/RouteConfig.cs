using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PoetryHub
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();

            // need to mape all routes to index if they aren't defined above
            // maybe use * somehow? this is if you want to use HTML5 mode urls

            // needs these for my current admin actions for development
            //#if DEBUG
            //            routes.MapRoute(
            //                name: "Default",
            //                url: "{controller}/{action}/{id}",
            //                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //            );
            //#endif
        }
    }
}
