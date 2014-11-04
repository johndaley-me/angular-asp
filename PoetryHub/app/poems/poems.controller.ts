module app {
    'use strict';
    var moduleId = 'app';
    var controllerId = 'Poems';
    var tab = { index: 1 }; // use this to remember tab position just during the session.
    angular
        .module(moduleId)
        .controller(controllerId, Controller);

    Controller.$inject = [
        '$location',
        '$scope',
        'poem',
        'user',
        'util'
    ];
    function Controller(
        $location: ng.ILocationService,
        $scope: ng.IScope,
        Poem: ng.resource.IResourceClass<Poem>,
        user: common.UserService,
        util: UtilService
        ) {
        var vm = this;
        vm.poems = [];
        vm.selectedPoems = [];
        vm.tab = tab;
        vm.readPoem = readPoem;

        activate();

        function activate() {

            vm.poems = Poem.query();

            // watch for changed on selectedStories
            $scope.$watch('vm.selectedPoems.length', function (newLength: number) {
                if (newLength === 1) {
                    readPoem(vm.selectedPoems[0]);
                }
            });
        }

        function readPoem(poem: Poem) {
            util.readPoem(poem, true);
        }
    }
}