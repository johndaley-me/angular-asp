var common;
(function (common) {
    'use strict';
    var moduleId = 'common';
    var controllerId = 'Nav';
    angular.module(moduleId).controller(controllerId, Controller);

    Controller.$inject = [
        '$route',
        '$scope',
        'user',
        'routes'
    ];
    function Controller($route, $scope, user, routes) {
        var vm = this;
        vm.navRoutes = getNavRoutes();
        vm.isActive = isActive;
        vm.routesMap = {};
        vm.logout = logout;

        // user login
        vm.loggedIn = true;
        vm.firstName = user.getFirstName();
        function getNavRoutes() {
            return routes.filter(function (r, index, array) {
                if (!r.config.settings) {
                    return false;
                } else {
                    return !!r.config.settings.nav;
                }
            }).sort(function (r1, r2) {
                return r1.config.settings.nav - r2.config.settings.nav;
            });
        }

        function isActive(route) {
            if (!route.config.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.config.title;
            return $route.current.title === menuName ? 'active' : '';
        }

        function logout() {
            //user.logout();
        }
    }
})(common || (common = {}));
//# sourceMappingURL=nav.controller.js.map
