var app;
(function (app) {
    'use strict';
    var moduleId = 'app';
    var controllerId = 'Poem';
    angular.module(moduleId).controller(controllerId, Controller);

    Controller.$inject = [
        '$routeParams',
        'common',
        'user',
        'poem',
        'util'
    ];
    function Controller($routeParams, common, user, Poem, util) {
        var vm = this;
        vm.poem = {};
        vm.title = 'Poem';

        activate();

        function activate() {
            // try to get item from local cache (this is currently used when transitioning from poems to poem view
            // since no sense in refetching.
            var localStory = common.tempData.removeData();
            if (!localStory) {
                // get entity from storage
                var id = $routeParams['poemId'];
                vm.poem = Poem.get({ Id: id });
            } else {
                vm.poem = localStory;
            }
        }
    }
})(app || (app = {}));
//# sourceMappingURL=poem.controller.js.map
