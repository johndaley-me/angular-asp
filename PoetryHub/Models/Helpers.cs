using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace PoetryHub // put in top namespace so that you don't have to import namespace into Views
{
    public static class HelperExtensions
    {

        public static bool Debug(this HtmlHelper helper)
        {
            return Boolean.Parse(System.Configuration.ConfigurationManager.AppSettings["Debug"]);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="bundleName">bundle for single file</param>
        /// <returns></returns>
        public static HtmlString DebugUrl(this UrlHelper helper, string bundleShortName)
        {
#if DEBUG
            return new HtmlString(bundleShortName);
#else
            return new HtmlString(Scripts.Url("~/bundles/" + bundleShortName).ToString());
#endif
        }

        /// <summary>
        /// Swaps the urls depending on whether this is a DEBUG build. That way we don't use the CDN during dev.
        /// This method is specific to the RequireJS fallback mechanism
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="release"></param>
        /// <param name="debug"></param>
        /// <returns></returns>
        public static HtmlString DebugSwap(this UrlHelper helper, string release, string debug)
        {
#if DEBUG
            return new HtmlString(helper.Content(debug) + "', '" + helper.Content(release));
#else
            return new HtmlString(helper.Content(release) + "', '" + helper.Content(debug));
#endif
        }

        /// <summary>
        /// Puts in the right url depending on whether this is a DEBUG build. Let's us point to local url during dev
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="release"></param>
        /// <param name="debug"></param>
        /// <returns></returns>
        public static HtmlString DebugReplace(this UrlHelper helper, string release, string debug)
        {
#if DEBUG
            return new HtmlString(helper.Content(debug));
#else
            return new HtmlString(helper.Content(release));
#endif
        }
    }

}