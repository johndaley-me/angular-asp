module app {
    'use strict';
    var moduleId = 'app';
    var resourceId = 'poem';
    angular
        .module(moduleId)
        .factory(resourceId, resource);

    // https://docs.angularjs.org/api/ngResource/service/$resource
    resource.$inject = ['$resource'];
    function resource($resource: ng.resource.IResourceService) {
        return $resource('/api/poem/:id', { id: '@Id' }, {
            update: { method: 'PUT' }
        });
    }

}