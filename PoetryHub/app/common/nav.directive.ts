module common {
    'use strict';
    var moduleId = 'common';
    var directiveId = 'rrNav';
    angular
        .module(moduleId) // get module
        .directive(directiveId, directive);

    // Usage:
    // <div data-rr-nav></div>
    // The top level navbar is in the main layout so that some parts of the website can go without
    // Angular but still have branding and home link
    function directive() {
        var directive = {
            //link: link,
            //scope: {
                 // @ one way binding, = two way binding, & function binding. Can also use custom name such as 'applicationTitle' = '@title'
                //'title': '@'
            //},
            templateUrl: '/app/common/nav.directive.html',
            restrict: 'EA',
            controller: 'Nav',
            controllerAs: 'vm'
        };
        return directive;

        //function link(scope, element, attrs, ctrls) {
        //    attrs.$set('class', 'widget-head');
        //}
    }
}
