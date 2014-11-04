// http interceptor functions https://code.angularjs.org/1.2.23/docs/api/ng/service/$http
// http://bitoftech.net/2014/06/09/angularjs-token-authentication-using-asp-net-web-api-2-owin-asp-net-identity/
var common;
(function (common) {
    'use strict';
    var moduleId = 'common';
    var serviceId = 'authInterceptor';

    angular.module(moduleId).factory(serviceId, factory).config(configAuthInterceptor);

    factory.$inject = [
        '$q',
        'logger'
    ];
    function factory($q, logger) {
        var service = {
            request: request,
            responseError: responseError
        };

        var log = logger.getLogger(serviceId);

        function isApiCall(url) {
            return url.indexOf('api') === 1;
        }

        function request(config) {
            if (isApiCall(config.url)) {
                // TODO set bearer token
            }
            return config;
        }

        function responseError(rejection) {
            if (isApiCall(rejection.config.url)) {
                if (rejection.status === 401) {
                    log.error('Unauthorized request. Please try to save your work and then refresh your browser.', rejection, true);
                } else if (rejection.status === 404) {
                    log.error('We couldn\'t find that. Sorry. It doesn\'t exist or you don\'t have permission to access it.', rejection, true);
                } else {
                    log.error('An error has occurred. Please try to save your work and then refresh your browser.', rejection, true);
                }
            }

            // always reject like this so that the default error handling happens too.
            return $q.reject(rejection);
        }

        return service;
    }

    configAuthInterceptor.$inject = ['$httpProvider'];
    function configAuthInterceptor($httpProvider) {
        $httpProvider.interceptors.push(serviceId);
    }
})(common || (common = {}));
//# sourceMappingURL=auth.interceptor.service.js.map
