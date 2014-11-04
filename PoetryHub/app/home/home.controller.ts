module app {
    'use strict';
    var moduleId = 'app';
    var controllerId = 'Home';
    angular
        .module(moduleId)
        .controller(controllerId, Controller);

    Controller.$inject = [
        //'$locationProvider',
        '$scope',
        'user'
    ];
    function Controller(
        //$locationProvider: ng.ILocationProvider,
        $scope: ng.IScope,
        user: common.UserService
        ) {

        var vm = this;
        vm.title = 'Home';
        vm.loggedIn = false;

        // login status
        vm.loggedIn = true;

        // user chooses to log in
        vm.login = function () { };

        // not used but this is how to use a button to navigate
        //vm.createDraft = function () {
        //    $location.path(routeMap['draft'].url);
        //};
    }
}