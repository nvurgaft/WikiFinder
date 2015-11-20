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
            .then(function (datum) {
                switch(vm.selectedFormat.name) {
                    case 'json':
                        $log.debug("response: " + JSON.stringify(datum));
                        vm.queryResult = JSON.parse(datum);
                        break;
                    case 'rdf':
                    case 'html':
                    case 'xml':
                        vm.queryResult = datum;
                        break;
                    default:
                        vm.queryResult = "Invalid Format";
                }
            }, function (error) {
                $log.error(error);
                vm.queryResult = [];
            })
            .finally(function () {
                vm.sendingQuery = false;
            });
    }
}

angular.module('app').controller('viafDashboardController', viafDashboardController);