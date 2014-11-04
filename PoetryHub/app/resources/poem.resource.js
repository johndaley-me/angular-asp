var app;
(function (app) {
    'use strict';
    var moduleId = 'app';
    var resourceId = 'poem';
    angular.module(moduleId).factory(resourceId, resource);

    // https://docs.angularjs.org/api/ngResource/service/$resource
    resource.$inject = ['$resource'];
    function resource($resource) {
        return $resource('/api/poem/:id', { id: '@Id' }, {
            update: { method: 'PUT' }
        });
    }
})(app || (app = {}));
//# sourceMappingURL=poem.resource.js.map
