module common {
    'use strict';
    var moduleId = 'common';
    var serviceId = 'logger';

    angular
        .module(moduleId) // get module
        .constant('toastr', toastr)
        .factory(serviceId, factory);

    // see http://codeseven.github.io/toastr/demo.html for how to use toastr
    factory.$inject = [
        '$log',
        'commonConfig',
        'toastr'
    ];
    function factory(
        $log: ng.ILogService,
        commonConfig: CommonConfig,
        toastr: Toastr
        ): LoggerService {

        var service: LoggerService = {
            getLogger: getLogger
        };

        return service;

        function getLogger(source: string): Logger {

            var logger: Logger = {
                debug: debug,
                error: error,
                info: info,
                success: success,
                warning: warning
            };

            return logger;

            function debug(message: string, data?: any, showToast?: boolean): void {
                if (!commonConfig.DEBUG) {
                    return;
                }
                message = '[DEBUG] ' + message;
                $log.debug(formatSource(source), message, data);
                if (showToast) {
                    toastr.error(message); // error so we'll notice it more. it doesn't matter too much
                }
            }

            function error(message: string, data?: any, showToast?: boolean): void {
                $log.error(formatSource(source), message, data);
                if (showToast) {
                    toastr.error(message);
                }
            }

            function info(message: string, data?: any, showToast?: boolean): void {
                $log.info(formatSource(source), message, data);
                if (showToast) {
                    toastr.info(message);
                }
            }

            function success(message: string, data?: any, showToast?: boolean): void {
                $log.log(formatSource(source), message, data);
                if (showToast) {
                    toastr.success(message);
                }
            }

            function warning(message: string, data?: any, showToast?: boolean): void {
                $log.warn(formatSource(source), message, data);
                if (showToast) {
                    toastr.warning(message);
                }
            }

            function formatSource(source) {
                return '[' + source + ']';
            }
        }

    }
} 