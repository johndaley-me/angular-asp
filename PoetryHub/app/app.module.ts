module app {
    'use strict';

    var moduleId = 'app';
    // don't use a local variable app since our typscript module is named app
    // https://docs.angularjs.org/guide/module
    // http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html
    angular
        .module(moduleId, [
        // Angular modules
            'ngAnimate', // not used at the moment could remove later
            'ngResource',
            'ngRoute',
            'ngSanitize',

        // Custom modules
            'common',

        // 3rd party modules
            'angular-loading-bar', //'cfp.loadingBar',
            'trNgGrid',
            'ui.bootstrap'
        ]);
}