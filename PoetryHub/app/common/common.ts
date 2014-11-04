/**
  * Apps must set the commonConfig using the config provider pattern:
  */
module common {
    'use strict';

    var moduleId = 'common';
    var commonId = 'common';

    angular
        .module(moduleId, ['ui.bootstrap']) // declare module
        .factory('tempData', tempData)
        .provider('commonConfig', commonConfig)
        .factory(commonId, common);

    function commonConfig() {
        this.DEBUG = false;

        this.$get = function () {
            var config: CommonConfig = {
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
    function common(
        $q: ng.IQService,
        $timeout: ng.ITimeoutService,
        commonConfig,
        logger: LoggerService,
        modal: ModalService,
        tempData
        ): Common {
        var service: Common = {
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
    function tempData(): TempDataService {
        var service: TempDataService = {
            setData: setData,
            removeData: removeData
        };

        function setData(data: any) {
            _data = data;
        }

        function removeData(): any {
            var rval = _data;
            _data = null;
            return rval;
        }

        return service;
    }
}
