using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace PoetryHub
{
    public static class WebApiConfig
    {
        /// <summary>
        /// my/stories, friend/stories/5, public/stories/
        /// </summary>
        /// <param name="config"></param>
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            //config.Filters.Add(new AuthorizeAttribute());

            // Web API routes
            //config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // my,friend    me, friends, public; my, fr

            // format json the way we want it (e.g. lowercase on client side for properties)
            var formatters = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            var settings = jsonFormatter.SerializerSettings;
            settings.DateTimeZoneHandling = DateTimeZoneHandling.Utc; // EF DateTime is always Unspecified Kind when retrieved from DB (other approach is for client to use toLocal filter)
            //settings.Formatting = Formatting.Indented;
            //settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
