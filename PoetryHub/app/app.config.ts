module app {
    'use strict';
    var moduleId = 'app';
    export declare var DEBUG: boolean;
    export declare var FACEBOOK_APP_ID: string;
    var config: Config = {
        //appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator
        docTitle: 'PoetryHub - ',
        //events: events,
        version: '0.0.1'
    };
    declare var TrNgGrid;
    angular
        .module(moduleId)
        .constant('DEBUG', !!app.DEBUG) // compile flag set via Razor in _Layout.cshtml or could override a different value here.
        .constant('TrNgGrid', TrNgGrid)
        .value('config', config)
        .config(configLogProvider)
        .config(configExceptionHandler)
        .config(configCommon)
        .run(configTrGrid)
        .run(configRootScope);

    configLogProvider.$inject = ['$logProvider', 'DEBUG'];
    function configLogProvider($logProvider: ng.ILogProvider, DEBUG: boolean) {
        // turn debugging off/on (no info or warn)
        $logProvider.debugEnabled(DEBUG);
    }

    // configure common module include FB settings, debugging, etc.
    configCommon.$inject = ['commonConfigProvider', 'DEBUG'];
    function configCommon(commonConfig: common.CommonConfig, DEBUG: boolean) {
        commonConfig.DEBUG = DEBUG;
    }

    // Extend the $exceptionHandler service to also display a toast.
    configExceptionHandler.$inject = ['$provide'];
    function configExceptionHandler($provide: ng.auto.IProvideService) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }
    extendExceptionHandler.$inject = ['$delegate', 'config', 'logger'];
    function extendExceptionHandler($delegate, config: Config, logger: common.LoggerService) {
        var log = logger.getLogger(moduleId);
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = { exception: exception, cause: cause };
            var msg = exception.message;
            log.debug(msg, errorData, true);
        };
    }

    function configTrGrid() {
        // http://moonstorm.github.io/trNgGrid/release/#/Customizations
        TrNgGrid.tableCssClass = 'tr-ng-grid table table-hover table-striped';
    }

    // Add a few utilities to Root scope. Avoid putting much in here other than util
    // except for testing
    configRootScope.$inject = ['$rootScope', 'util'];
    function configRootScope($rootScope, util: UtilService) {
        $rootScope.util = util;
    }
}
