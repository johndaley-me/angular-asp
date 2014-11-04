module app {
    'use strict';
    var moduleId = 'app';
    var controllerId = 'Draft';
    angular
        .module(moduleId)
        .controller(controllerId, Controller);

    // editing a draft
    // sequence for creating a draft:
    //  1. User navigates to create draft.
    //  2. Controller is instantiated.
    //  3. Controller checks that user is creating a new draft based on $location
    //  4. Controller creates draft and sets it into the $scope
    //  5. Controller also saves the draft and registers a callback.
    //  5. Controller gets callback when the draft is saved.
    //  6. Controller redirects to the right $location while keeping a handle on the draft    (or can we just use location.hash?
    //  7. If the Controller already has the right id then don't query for a draft
    Controller.$inject = [
        '$http',
        '$location',
        '$routeParams',
        '$scope',
        '$window',
        'common',
        'user',
        'poem',
        'util'
    ];

    function Controller(
        $http: ng.IHttpService,
        $location: ng.ILocationService,
        $routeParams,
        $scope: ng.IScope,
        $window: ng.IWindowService,
        common: common.Common,
        user: common.UserService,
        Draft: ng.resource.IResourceClass<Draft>,
        util: UtilService
        ) {
        // #region vars
        var vm = this;
        // view bindings
        vm.draft = {};
        vm.save = save;
        vm.del = del;
        vm.publish = publish;

        vm.postEdit = postEdit;
        vm.postPropertyChange = postPropertyChange;

        var draftDirty = false; // track dirty state for properties and content (clean after saving to DB)
        // we don't call it dirty if it is a change from a signalr broadcast because that other user will 
        // have a dirty state and we don't want to have everyone saving all the time (I think). 
        // But we won't maintain a save button state at all and users can save whenever they want.
        var log = common.logger.getLogger(controllerId);
        // #endregion


        vm.showDetails = true;

        activate(); // other initialization

        function activate() {
            // get draft entity from storage
            // try local storage first because it may have just been created for you
            // by the route resolver
            var localDraft = common.tempData.removeData();
            var id = $routeParams['draftId'];
            if (true) { // cache not working right now !localDraft) {
                vm.draft = Draft.get({ Id: id }, function (d: Draft) {
                });
            } else {
                vm.draft = localDraft;
                //hub.joinGroup(vm);
            }
        }

        function del() {
            var result = common.modal.show({
                title: 'Delete draft?',
                message: 'Are you sure that you want to delete this draft? You will not be able to undo this?',
                okText: 'Yes. Delete.',
                cancelText: 'Cancel'
            });
            result.then(function () {
                vm.draft.$delete().then(function () {
                    log.info('Draft deleted', null, true);
                    $location.path('/drafts');
                },
                    function (reason) {
                        log.error('Deletion failed. Reason: ' + (reason ? reason : 'unknown'), reason, true);
                    });
            });
        }

        function save(): ng.IPromise<any> {
            draftDirty = false; // change on catch so that we aren't out of sync with ongoing changes
            vm.draft.LastModified = new Date();
            var saved = vm.draft.$update();
            saved.then(function () {
                log.success('Changes saved', null, true);
            });
            saved.catch(function (rejection: ng.IHttpPromiseCallbackArg<any>) {
                draftDirty = true;

                if (rejection.status === 401) {
                    log.error('Save failed. Please log in to retry.', rejection, true);
                    // show dialog and then try to resave if you can.
                } else {
                    log.error('Changes could not be saved', rejection, true);
                }
            });

            return saved;
        }

        function publish() {
            var saved = save();
            util.readPoem(vm.draft);
        }

        $scope.$on('$locationChangeStart', function (event) {
            if (!draftDirty) {
                return;
            }
            var result = common.modal.show({
                title: 'Save changes?',
                message: 'You have unsaved changes. Would you like to save them now?',
                okText: 'Yes. Save changes.',
                cancelText: 'No. Unsaved changes will be lost.'
            });
            result.then(function () {
                var saved = save();
                saved.catch(function (reason) {
                    var saveFailedOpts = {
                        title: 'Save Failed. Leave Page?',
                        message: 'Your changes could not be saved. Do you still want to leave the page?',
                        okText: 'Yes',
                        cancelText: 'No'
                    };
                    if (reason) {
                        saveFailedOpts.message += saveFailedOpts + ' Reason: ' + reason;
                    }
                    var result2 = common.modal.show(saveFailedOpts);
                    result2.catch(function (reason) {
                        // cancel navigation
                        event.preventDefault();
                    });
                });
            },
                function () {
                    log.warning('You left the page without saving'); // TODO in the future could have undo feature here
                });
        });

        $scope.$on('$destroy', function () {
            // cleanup
            draftDirty = false; // TODO may want to do some event deregistering here.
        });

        // try to disconnect on window close
        $window.onbeforeunload = function (event) {
            if (!draftDirty) {
                return;
            }
            var message = 'WARNING: You have unsaved changes!';
            if (typeof event === 'undefined') {
                event = $window.event;
            }
            if (event) {
                event.returnValue = message;
            }
            return message;
        };

        function postEdit() {
            draftDirty = true;
        }

        function postPropertyChange(name: string) {
            draftDirty = true;
        }
    }
}