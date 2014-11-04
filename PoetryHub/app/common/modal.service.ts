module common {
    'use strict';
    var moduleId = 'common';
    var serviceId = 'modal';

    angular
        .module(moduleId) // get module
        .factory(serviceId, factory);

    factory.$inject = [
        '$modal',
        '$templateCache'
    ];
    function factory(
        $modal: ng.ui.bootstrap.IModalService,
        $templateCache: ng.ITemplateCacheService
        ): ModalService {

        var service: ModalService = {
            show: show
        };

        var TEMPLATE_URL = 'modal.html';
        $templateCache.put(TEMPLATE_URL,
            '<div>' +
            '    <div class="modal-header">' +
            '        <h4>{{ options.title }}</h4>' +
            '    </div>' +
            '    <div class="modal-body">' +
            '        <p>{{ options.message }}</p>' +
            '    </div>' +
            '    <div class="modal-footer">' +
            '        <button class="btn btn-primary" ng-click="ok()">{{ options.okText }}</button>' +
            '        <button class="btn btn-default" ng-click="cancel()">{{ options.cancelText }}</button>' +
            '    </div>' +
            '</div>');

        function show(options: ModalOptions): ng.IPromise<any> {
            var opts: ModalOptions = {
                title: '',
                message: '',
                okText: 'OK',
                cancelText: 'Cancel'
            };
            angular.extend(opts, options);

            var modalSettings: ng.ui.bootstrap.IModalSettings = {
                controller: ModalInstance,
                templateUrl: TEMPLATE_URL,
                resolve: {
                    options: function () {
                        return opts;
                    }
                }
            };

            return $modal.open(modalSettings).result;
        }

        ModalInstance.$inject = [
            '$scope',
            '$modalInstance',
            'options'
        ];
        function ModalInstance(
            $scope,
            $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
            options: ModalOptions
            ) {
            $scope.options = options;
            $scope.ok = function () { $modalInstance.close('ok'); };
            $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
        };

        return service;
    }
}  