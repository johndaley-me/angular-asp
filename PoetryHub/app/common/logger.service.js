var common;
(function (common) {
    'use strict';
    var moduleId = 'common';
    var serviceId = 'logger';

    angular.module(moduleId).constant('toastr', toastr).factory(serviceId, factory);

    // see http://codeseven.github.io/toastr/demo.html for how to use toastr
    factory.$inject = [
        '$log',
        'commonConfig',
        'toastr'
    ];
    function factory($log, commonConfig, toastr) {
        var service = {
            getLogger: getLogger
        };

        return service;

        function getLogger(source) {
            var logger = {
                debug: debug,
                error: error,
                info: info,
                success: success,
                warning: warning
            };

            return logger;

            function debug(message, data, showToast) {
                if (!commonConfig.DEBUG) {
                    return;
                }
                message = '[DEBUG] ' + message;
                $log.debug(formatSource(source), message, data);
                if (showToast) {
                    toastr.error(message); // error so we'll notice it more. it doesn't matter too much
                }
            }

            function error(message, data, showToast) {
                $log.error(formatSource(source), message, data);
                if (showToast) {
                    toastr.error(message);
                }
            }

            function info(message, data, showToast) {
                $log.info(formatSource(source), message, data);
                if (showToast) {
                    toastr.info(message);
                }
            }

            function success(message, data, showToast) {
                $log.log(formatSource(source), message, data);
                if (showToast) {
                    toastr.success(message);
                }
            }

            function warning(message, data, showToast) {
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
})(common || (common = {}));
//# sourceMappingURL=logger.service.js.map
