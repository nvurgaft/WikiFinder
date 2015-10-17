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
        {
            name: "xml"
        },
        {
            name: "json"
        },
        {
            name: "rdf"
        },
        {
            name: "html"
        }
    ];

    vm.selectedFormat = vm.formatList[1];

    vm.clearQuery = function () {
        vm.wikidataQuery = "";
    };

    vm.queryId = 0;
    vm.sendViafRequest = function (vid, format) {
        $log.debug("vid: " + vid + ", format: " + format.name);
        vm.sendingQuery = true;
        vm.queryId = vid;
        viafService.get(vid, format.name)
            .then(function (response) {
                switch(vm.selectedFormat.name) {
                    case 'json':
                        vm.queryResult = JSON.parse(response.data);
                        break;
                    case 'rdf':
                    case 'html':
                    case 'xml':
                        vm.queryResult = response;
                        break;
                    default:
                        vm.queryResult = "Invalid Format";
                }
            }, function (response) {
                vm.queryResult = response.status + " : " + response.data;
            })
            .finally(function () {
                vm.sendingQuery = false;
            });
    }
}

angular.module('app').controller('viafDashboardController', viafDashboardController);