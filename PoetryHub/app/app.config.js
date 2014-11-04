var app;
(function (app) {
    'use strict';
    var moduleId = 'app';

    var config = {
        //appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator
        docTitle: 'PoetryHub - ',
        //events: events,
        version: '0.0.1'
    };

    angular.module(moduleId).constant('DEBUG', !!app.DEBUG).constant('TrNgGrid', TrNgGrid).value('config', config).config(configLogProvider).config(configExceptionHandler).config(configCommon).run(configTrGrid).run(configRootScope);

    configLogProvider.$inject = ['$logProvider', 'DEBUG'];
    function configLogProvider($logProvider, DEBUG) {
        // turn debugging off/on (no info or warn)
        $logProvider.debugEnabled(DEBUG);
    }

    // configure common module include FB settings, debugging, etc.
    configCommon.$inject = ['commonConfigProvider', 'DEBUG'];
    function configCommon(commonConfig, DEBUG) {
        commonConfig.DEBUG = DEBUG;
    }

    // Extend the $exceptionHandler service to also display a toast.
    configExceptionHandler.$inject = ['$provide'];
    function configExceptionHandler($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }
    extendExceptionHandler.$inject = ['$delegate', 'config', 'logger'];
    function extendExceptionHandler($delegate, config, logger) {
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
    function configRootScope($rootScope, util) {
        $rootScope.util = util;
    }
})(app || (app = {}));
//# sourceMappingURL=app.config.js.map
