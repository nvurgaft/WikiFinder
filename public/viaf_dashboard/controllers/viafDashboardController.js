/**
 * Created by Koby on 09-Oct-15.
 */

function viafDashboardController($log, viafService) {
    var vm = this;

    vm.viafQuery = "";
    vm.format = "";

    vm.viafQueryResult = "";
    vm.sendingQuery = false;

    vm.wikidataQueryCollapse = true;
    vm.qidQueryCollapse = true;

    vm.formatList = [
        {name: "html", value: 1},
        {name: "json", value: 2}
    ];

    vm.selectedFormat = vm.formatList[1];

    vm.clearQuery = function () {
        vm.wikidataQuery = "";
    };

    vm.sendViafRequest = function (vid, format) {
        $log.debug("vid: " + vid + ", format: " + format.name);
        vm.sendingQuery = true;
        viafService.get(vid, format.name)
            .then(function (response) {
                if (vm.selectedFormat.name==='json') {
                    vm.queryResult = JSON.parse(response);
                } else {
                    vm.queryResult = response;
                }
            }, function (response) {
                vm.queryResult = response;
            })
            .finally(function () {
                vm.sendingQuery = false;
            });
    }
}

angular.module('app').controller('viafDashboardController', viafDashboardController);