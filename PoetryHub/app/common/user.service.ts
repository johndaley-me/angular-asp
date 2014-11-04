module common {
    'use strict';
    var moduleId = 'common';
    var serviceId = 'user';

    angular
        .module(moduleId)
        .factory(serviceId, factory);

    factory.$inject = [
        '$http',
        '$location',
        '$rootScope',
        'common'
    ];
    function factory(
        $http: ng.IHttpService,
        $location: ng.ILocationService,
        $rootScope: ng.IRootScopeService,
        common: Common
        ) {

        var service: UserService = {
            user: null,
            ensureLogin: ensureLogin,
            getFirstName: getFirstName,
            getPicture: getPicture
        };

        service.user = {
            Id: 123,
            Name: 'Anonymous'
        };

        var log = common.logger.getLogger(serviceId);

        function getFirstName() {
            return service.user.Name;
        }

        function getPicture() {
            return '/unknown.svg';
        }

        function ensureLogin(): ng.IPromise<any> {

            var loggedInUser = common.$q.defer();
            loggedInUser.resolve();
            return loggedInUser.promise;
        }

        return service;
    }
} 