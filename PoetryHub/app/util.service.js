// be careful what you put in here because we inject this into the rootScope
var app;
(function (app) {
    'use strict';
    var moduleId = 'app';
    var serviceId = 'util';

    angular.module(moduleId).factory(serviceId, factory);

    factory.$inject = [
        '$filter',
        '$location',
        '$modal',
        '$rootScope',
        '$window',
        'common'
    ];

    // used to DRY and for when we don't want another service or directive
    function factory($filter, $location, $modal, $rootScope, $window, common) {
        // interface
        var service = {
            editDraft: editDraft,
            goHome: goHome,
            readPoem: readPoem,
            isDebug: isDebug
        };
        var log = common.logger.getLogger(serviceId);

        function readPoem(poem, useCache, openNewWindow) {
            if (useCache) {
                common.tempData.setData(poem);
            }
            var path = '/poem/' + poem.Id + '/' + getTitleUri(poem.Title);
            if (openNewWindow) {
                $window.open(path, '_blank');
            } else {
                $location.path(path);
            }
        }

        // because of MVC restrictions just convert non-latin word characters to -
        function getTitleUri(title) {
            if (!title) {
                log.error('This poem has no title', null, true);
                return 'untitled';
            } else {
                return encodeURIComponent(title.trim().toLowerCase().replace(/\W+/g, '-'));
                //return encodeURIComponent(title.trim().toLowerCase().replace(/(\s|\.)+/g, '-'));
            }
        }

        function editDraft(draft) {
            // warning this could make data stale if someone else has edited, but in the event of live edit
            // we will get updates anyways.
            //common.tempData.setData(draft);
            $location.path('/draft/' + draft.Id);
        }

        function goHome() {
            $location.path('/');
        }

        function isDebug() {
            return common.config.DEBUG;
        }

        return service;
    }
})(app || (app = {}));
//# sourceMappingURL=util.service.js.map
