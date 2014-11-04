using System;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace PoetryHub
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bool debug = Boolean.Parse(System.Configuration.ConfigurationManager.AppSettings["Debug"]);
            BundleTable.EnableOptimizations = !debug;
            bundles.UseCdn = !debug;

            // Keep css in the same source folder and include anything that doesn't need relative pathing that's outside Content
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Site.css",
                "~/bower_components/angular-loading-bar/build/loading-bar.min.css",
                "~/bower_components/trNgGrid/release/trNgGrid.min.css"));

            // js
            var libBundle = new ScriptBundle("~/bundles/lib").
                Include("~/bower_components/angular-loading-bar/build/loading-bar.min.js").
                Include("~/bower_components/trNgGrid/release/trNgGrid.min.js");
            bundles.Add(libBundle);

            bundles.Add(new ScriptBundle("~/bundles/app").
                // do alphabetically when possible but you do have to define the angularjs module first (interfaces.js is typically not used)
                // app - app.js first do define app module
                Include("~/app/app.module.js").
                Include("~/app/app.config.js").
                Include("~/app/app.routes.js").
                Include("~/app/util.service.js").

                // common - common.js first to define the module first
                Include("~/app/common/common.js").
                Include("~/app/common/auth.interceptor.service.js").
                Include("~/app/common/limit-after-last-word.filter.js").
                Include("~/app/common/logger.service.js").
                Include("~/app/common/modal.service.js").
                Include("~/app/common/nav.controller.js").
                Include("~/app/common/nav.directive.js").
                Include("~/app/common/user.service.js").

                // draft view
                Include("~/app/draft/draft.controller.js").

                // home view
                Include("~/app/home/home.controller.js").

                // poem view
                Include("~/app/poem/poem.controller.js").

                // poems view
                Include("~/app/poems/poems.controller.js").

                // angularjs resource definitions for the web api
                Include("~/app/resources/poem.resource.js"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
        }
    }
}
