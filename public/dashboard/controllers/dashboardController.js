/**
 * Created by Koby on 25-Sep-15.
 */
function dashboardController($log, wikidataService) {
    var vm = this;

    vm.wikidataQuery = "";
    vm.qQuery = "";

    vm.sendingQuery = false;

    vm.wikidataQueryCollapse = true;
    vm.qidQueryCollapse = true;

    vm.queryTypes = [
        {name: "claim", value: 1},
        {name: "noclaim", value: 2},
        {name: "string", value: 3},
        {name: "ids", value: 4},
        {name: "tree", value: 5},
        {name: "web", value: 6},
        {name: "around", value: 7},
        {name: "between", value: 8},
        {name: "quantity", value: 9},
        {name: "items", value: 10},
        {name: "link", value: 11}
    ];

    vm.clearQuery = function () {
        vm.wikidataQuery = "";
    };

    vm.sendQIDRequest = function (query) {
        vm.sendingQuery = true;
        wikidataService.get(query)
            .then(function (response) {
                vm.queryResult = (JSON.parse(response)).entities['Q' + query];
            }, function (response) {
                vm.queryResult = response;
            })
            .finally(function () {
                vm.sendingQuery = false;
            });
    };

    vm.sendWikidataRequest = function (type, field) {
        vm.sendingQuery = true;
        wikidataService.sendWikidataQuery(type, field)
            .then(function (response) {
                vm.queryResult = JSON.parse(response);
            }, function (response) {
                vm.queryResult = response;
            })
            .finally(function () {
                vm.sendingQuery = false;
            });
    }
}

angular.module('app').controller('dashboardController', dashboardController);