/**
 * Created by Koby on 12-Oct-15.
 */
function linkerController($log, wikidataService, viafService) {

    var vm = this;

    vm.personLookupName = "";
    vm.wikidataQueryResult = "";
    vm.viafQueryResult = "";

    vm.processingWikidataSegment = false;
    vm.processingViafSegment = false;

    vm.clearWikidataRequest = function () {
        vm.wikidataRequest = "";
    };

    vm.clearViafRequest = function () {
        vm.viafRequest = "";
    };

    vm.searchName = function(name) {

        vm.processWikidataRequest(name);
    };

    vm.processWikidataRequest = function (name) {
        vm.processingWikidataSegment = true;
        wikidataService.getEntitiesByName(name, "en", "json")
            .then(function (response) {
                vm.wikidataQueryResult = JSON.parse(response.data);
            }, function (response) {
                vm.wikidataQueryResult = response;
            })
            .finally(function () {
                vm.processingWikidataSegment = false;
            });
    };

    // Send QID
    vm.getQIDProperties = function (query) {
        vm.sendingQuery = true;
        wikidataService.get(query)
            .then(function (response) {
                var data = (JSON.parse(response)).entities['Q' + query];
                vm.wikidataItemPropertiesList = data.claims;
            }, function (response) {
                vm.wikidataItemPropertiesList = response;
            })
            .finally(function () {
                vm.sendingQuery = false;
            });
    };

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
    };
}

angular.module('app').controller('linkerController', linkerController);