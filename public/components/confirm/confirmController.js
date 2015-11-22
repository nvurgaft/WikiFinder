/**
 * Created by Nick on 11/22/2015.
 */

function confirmController($uibModalInstance, params) {

    var vm = this;

    vm.title = params.title;
    vm.message = params.message;

    vm.dismiss = function() {
        $uibModalInstance.close();
    };

    vm.ok = function() {
        $uibModalInstance.dismiss();
    }
}

angular.module('app').controller('confirmController', confirmController);