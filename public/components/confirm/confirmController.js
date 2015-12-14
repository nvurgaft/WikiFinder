/**
 * Created by Nick on 11/22/2015.
 */

function confirmController($uibModalInstance, params) {

    var vm = this;

    vm.title = params.title;
    vm.message = params.message;

    vm.dismiss = function() {
        $uibModalInstance.dismiss('cancel');
    };

    vm.ok = function() {
        $uibModalInstance.close('ok');
    }
}

angular.module('app').controller('confirmController', confirmController);