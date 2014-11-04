/**
* Apps must set the commonConfig using the config provider pattern:
*/
var common;
(function (_common) {
    'use strict';

    var moduleId = 'common';
    var commonId = 'common';

    angular.module(moduleId, ['ui.bootstrap']).factory('tempData', tempData).provider('commonConfig', commonConfig).factory(commonId, common);

    function commonConfig() {
        this.DEBUG = false;

        this.$get = function () {
            var config = {
                DEBUG: this.DEBUG
            };
            return config;
        };
    }

    common.$inject = [
        '$q',
        '$timeout',
        'commonConfig',
        'logger',
        'modal',
        'tempData'
    ];
    function common($q, $timeout, commonConfig, logger, modal, tempData) {
        var service = {
            $q: $q,
            $timeout: $timeout,
            config: commonConfig,
            logger: logger,
            modal: modal,
            tempData: tempData
        };
        return service;
    }

    // for passing info between routes - there's probably a more angularjs way to do this
    var _data;
    function tempData() {
        var service = {
            setData: setData,
            removeData: removeData
        };

        function setData(data) {
            _data = data;
        }

        function removeData() {
            var rval = _data;
            _data = null;
            return rval;
        }

        return service;
    }
})(common || (common = {}));
//# sourceMappingURL=common.js.map
