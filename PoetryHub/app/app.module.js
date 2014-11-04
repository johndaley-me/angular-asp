var app;
(function (app) {
    'use strict';

    var moduleId = 'app';

    // don't use a local variable app since our typscript module is named app
    // https://docs.angularjs.org/guide/module
    // http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html
    angular.module(moduleId, [
        'ngAnimate',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'common',
        'angular-loading-bar',
        'trNgGrid',
        'ui.bootstrap'
    ]);
})(app || (app = {}));
//# sourceMappingURL=app.module.js.map
