/**
 * Created by Koby on 12-Oct-15.
 */
function linkerController($log, wikidataService, viafService) {

    var vm = this;

    vm.wikidataQueryResult = "";
    vm.viafQueryResult = "";

    vm.processingWikidataSegment = false;
    vm.processingViafSegment = false;

    vm.clearWikidataRequest = function () {
        vm.wikidataRequest = "";
    }

    vm.clearViafRequest = function () {
        vm.viafRequest = "";
    }

    vm.processWikidataRequest = function (query) {
        vm.processingWikidataSegment = true;
        wikidataService.get(query)
            .then(function (response) {
                vm.wikidataQueryResult = JSON.parse(response);
            }, function (response) {
                vm.wikidataQueryResult = response;
            })
            .finally(function () {
                vm.processingWikidataSegment = false;
            });
    }

    vm.processViafRequest = function (query) {
        vm.processingViafSegment = true;
        viafService.get(query, 'json')
            .then(function (response) {
                vm.viafQueryResult = JSON.parse(response);
            }, function (response) {
                vm.viafQueryResult = response;
            })
            .finally(function () {
                vm.processingViafSegment = false;
            });
    }
}

angular.module('app').controller('linkerController', linkerController);