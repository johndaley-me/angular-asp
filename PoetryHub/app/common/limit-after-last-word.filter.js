// Could also do something like this: filter for paragraph http://jsfiddle.net/tUyyx/ or maybe something from http://jsfiddle.net/xMYpy/
// http://plnkr.co/edit/2YbahnAAh5IQe7iwZdz4?p=info
var common;
(function (common) {
    'use strict';
    var moduleId = 'common';
    var filterId = 'limitAfterLastWord';
    angular.module(moduleId).filter(filterId, filter);

    // Limits a paragraph to a specific length without splitting up words.
    function filter() {
        return function (text, maxLength) {
            if (!text) {
                return '';
            }
            if (!angular.isNumber(maxLength)) {
                maxLength = 1000; // don't change this unless you want to change client
                // which is expecting this default
            }
            if (text.length <= maxLength) {
                return text;
            }
            var index = text.lastIndexOf(' ', maxLength);
            if (index < 0) {
                index = maxLength - 1;
            }
            return text.substring(0, index) + '...';
        };
    }
})(common || (common = {}));
//# sourceMappingURL=limit-after-last-word.filter.js.map
