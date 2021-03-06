﻿var app;
(function (app) {
    'use strict';

    // have to define routes before calling angular since it's a local variable
    // These are routes specific to the App - there are a for more site-wide urls
    // handled further down
    var routesDefinition = [
        {
            url: '/',
            config: {
                templateUrl: '/template/_home',
                title: 'home',
                controller: 'Home',
                controllerAs: 'vm'
            }
        },
        {
            url: '/createDraft',
            config: {
                title: 'draft',
                templateUrl: '/app/draft/draft.html',
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-pencil fa-lg"></i> New Poem'
                },
                controller: 'None',
                controllerAs: 'vm',
                resolve: { 'createDraft': createDraft }
            }
        },
        {
            url: '/draft/:draftId',
            config: {
                title: 'draftId',
                templateUrl: '/app/draft/draft.html',
                controller: 'Draft',
                controllerAs: 'vm',
                resolve: { 'ensureLogin': ensureLogin }
            }
        },
        {
            url: '/poem/:poemId/:poemTitle?',
            config: {
                title: 'poemId',
                templateUrl: '/app/poem/poem.html',
                controller: 'Poem',
                controllerAs: 'vm',
                resolve: { 'ensureLogin': ensureLogin }
            }
        },
        {
            url: '/poems',
            config: {
                title: 'poems',
                templateUrl: '/app/poems/poems.html',
                settings: {
                    nav: 4,
                    content: '<i class="fa fa-book fa-lg"></i> Poems'
                },
                controller: 'Poems',
                controllerAs: 'vm',
                resolve: { 'ensureLogin': ensureLogin }
            }
        }
    ];
    var moduleId = 'app';
    angular.module(moduleId).constant('routes', routesDefinition).config(routeConfigurator);

    routeConfigurator.$inject = [
        '$locationProvider',
        '$routeProvider',
        'routes'
    ];
    function routeConfigurator($locationProvider, $routeProvider, routes) {
        // html5 urls can be used with $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // resolvers - be sure to inject them to be prepared for minification
    // https://docs.angularjs.org/api/auto/service/$injector#invoke
    ensureLogin.$inject = [
        'common'
    ];
    function ensureLogin(common) {
        // mock login
        var deferred = common.$q.defer();
        deferred.resolve();
        return deferred.promise;
    }

    // creates a draft. The promise will always get rejected. And this resolver handles navigating
    // to the newly created draft. It seems a little awkward but this way we can have it as
    // an action on the navbar and not need special click handlers there.
    createDraft.$inject = [
        '$location',
        'common',
        'poem',
        'user',
        'util'
    ];
    function createDraft($location, common, Draft, user, util) {
        var deferred = common.$q.defer();
        var loggedIn = user.ensureLogin();
        loggedIn.then(function () {
            var now = new Date();
            var draft = new Draft({
                Title: 'Untitled',
                CreatedOn: now,
                LastModified: now,
                Date: now,
                IsPublished: false,
                Author: user.user.Name
            });
            draft.$save().then(function (d) {
                $location.replace(); // don't keep old id or create draft in browser history
                util.editDraft(d); // navigates to it
                common.tempData.setData(d);
                deferred.reject(); // I think it's correct to use $location.path and then reject
                // otherwise I would think there could be an extra redirection back to the origin.
            }).catch(function (reason) {
                var msg = reason || 'reason unknown';
                common.logger.getLogger('createDraft').error('Could not create draft', msg, true);

                // TODO go back to previous location if there is one
                // for now just go home
                $location.replace(); // don't keep old id or create draft in browser history
                $location.path('/');
                deferred.reject();
            });
        });

        loggedIn.catch(function () {
            deferred.reject();
        });
        return deferred.promise;
    }
})(app || (app = {}));
//# sourceMappingURL=app.routes.js.map
