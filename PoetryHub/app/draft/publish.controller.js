var app;
(function (app) {
    'use strict';
    var moduleId = 'app';
    var controllerId = 'Publish';
    angular.module(moduleId).controller(controllerId, Controller);

    // publish a draft
    Controller.$inject = [
        '$modalInstance',
        '$scope',
        'draft'
    ];
    function Controller($modalInstance, $scope, draft) {
        var vm = $scope;
        vm.draft = draft;
        vm.publish = publish;
        vm.cancel = cancel;
        vm.hasMissingFields = hasMissingFields;

        function hasMissingFields() {
            if (!draft.Title || !draft.Author || !draft.Content) {
                return true;
            } else {
                return false;
            }
        }

        function publish() {
            $modalInstance.close();
            // let caller handle state of draft with modelInstance.result
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
            // let caller handle state of draft with modelInstance.result
        }
    }
})(app || (app = {}));
//# sourceMappingURL=publish.controller.js.map
