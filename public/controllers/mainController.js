/**
 * Created by Koby on 05-Oct-15.
 */
function mainController($log) {
    var vm = this;

    $log.debug('started mainController');
    vm.collapsed = true;
}

angular.module('app').controller('mainController', mainController);