module app {
    'use strict';
    var moduleId = 'app';
    var controllerId = 'Poem';
    angular
        .module(moduleId)
        .controller(controllerId, Controller);

    Controller.$inject = [
        '$routeParams',
        'common',
        'user',
        'poem',
        'util',
    ];
    function Controller(
        $routeParams: ng.route.IRouteParamsService,
        common: common.Common,
        user: common.UserService,
        Poem: ng.resource.IResourceClass<Poem>,
        util: UtilService
        ) {

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
}