/**
 * Created by Koby on 25-Sep-15.
 */
function dashboardController($log, wikidataService, PreferencesService) {
    var vm = this;

    vm.qQuery = "";

    vm.sendingQuery = false;

    vm.wikidataQueryCollapse = true;
    vm.qidQueryCollapse = true;

    vm.queryParts = [{
        queryType: "claim",
        queryBody: ""
    }];

    vm.addQueryPart = function() {
        vm.queryParts.push({
            queryType: "claim",
            queryBody: ""
        })
    };

    vm.removeQueryPart = function(index) {
        vm.queryParts.splice(index, 1);
    };

    vm.queryTypes = ["claim", "noclaim", "string", "ids", "tree", "web", "around", "between", "quantity", "items", "link"];

    vm.clearQuery = function () {
        vm.wikidataQuery = "";
    };

    // Send QID
    vm.sendQIDRequest = function (query) {
        var queryLang = PreferencesService.getLanguage().value;
        vm.sendingQuery = true;
        wikidataService.get(query, queryLang)
            .then(function (response) {
                vm.queryResult = (JSON.parse(response.data)).entities['Q' + query];
            }, function (response) {
                vm.queryResult = response.status + " " + response.data;
            })
            ['finally'](function () {
                vm.sendingQuery = false;
            });
    };

    // Send Wikidata query
    vm.sendWikidataRequest = function() {
        var finalRequest = "";
        _.each(vm.queryParts, function(part, index, list) {
            if (part.queryType.length===0 || part.queryBody.length===0) {
                return;
            }
            finalRequest += part.queryType + "[" + part.queryBody + "]";
            if (index!==list.length-1) {
                finalRequest += " AND ";
            }
        });
        $log.debug("request string: " + finalRequest);

        vm.sendingQuery = true;
        wikidataService.sendWikidataQuery(finalRequest)
            .then(function (response) {
                vm.queryResult = JSON.parse(response.data);
            }, function (response) {
                vm.queryResult = response.status + " " + response.data;
            })
            ['finally'](function () {
                vm.sendingQuery = false;
            });
    }
}

angular.module('app').controller('dashboardController', dashboardController);