var app;
(function (app) {
    'use strict';
    var moduleId = 'app';
    var controllerId = 'Poems';
    var tab = { index: 1 };
    angular.module(moduleId).controller(controllerId, Controller);

    Controller.$inject = [
        '$location',
        '$scope',
        'poem',
        'user',
        'util'
    ];
    function Controller($location, $scope, Poem, user, util) {
        var vm = this;
        vm.poems = [];
        vm.selectedPoems = [];
        vm.tab = tab;
        vm.readPoem = readPoem;

        activate();

        function activate() {
            vm.poems = Poem.query();

            // watch for changed on selectedStories
            $scope.$watch('vm.selectedPoems.length', function (newLength) {
                if (newLength === 1) {
                    readPoem(vm.selectedPoems[0]);
                }
            });
        }

        function readPoem(poem) {
            util.readPoem(poem, true);
        }
    }
})(app || (app = {}));
//# sourceMappingURL=poems.controller.js.map
