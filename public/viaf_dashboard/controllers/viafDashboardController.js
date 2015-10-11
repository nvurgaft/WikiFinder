/**
 * Created by Koby on 09-Oct-15.
 */
function viafDashboardController($log) {
    var vm = this;

    vm.wikidataQuery = "";
    vm.qQuery = "";

    vm.wikidataQueryResult = "";
    vm.qQueryResult = "";
    vm.sendingQuery = false;

    vm.wikidataQueryCollapse = true;
    vm.qidQueryCollapse = true;

    vm.clearQuery = function () {
        vm.wikidataQuery = "";
    };

}

angular.module('app').controller('viafDashboardController', viafDashboardController);