/**
 * Created by Koby on 25-Sep-15.
 */
function dashboardController($log, wikidataService, PreferencesService, $uibModal) {
    var vm = this;

    vm.qQuery = "";

    vm.queryResult = "";
    vm.sendingQuery = false;

    vm.wikidataQueryCollapse = true;
    vm.qidQueryCollapse = true;

    vm.queryParts = [{
        queryType: "claim",
        queryBody: ""
    }];

    vm.addQueryPart = function () {
        vm.queryParts.push({
            queryType: "claim",
            queryBody: ""
        })
    };

    vm.removeQueryPart = function (index) {
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
    vm.sendWikidataRequest = function () {
        var finalRequest = "";
        _.each(vm.queryParts, function (part, index, list) {
            if (part.queryType.length === 0 || part.queryBody.length === 0) {
                return;
            }
            finalRequest += part.queryType + "[" + part.queryBody + "]";
            if (index !== list.length - 1) {
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
    };

    vm.savingWikidataResult = false;
    vm.saveWikidataResultOnDB = function () {
        vm.savingWikidataResult = true;
        $uibModal.open({
            animation: true,
            templateUrl: 'components/confirm/confirm-tmpl.html',
            controller: 'confirmController as vm',
            size: 'sm',
            resolve: {
                params: function () {
                    return {
                        title: "Save Wikidata?",
                        message: "This action will place this article on persistent storage!"
                    };
                }
            }
        }).result.then(function (response) {
            $log.info("Modal returned : " + response);
            if (vm.queryResult) {
                var obj = {
                    id: vm.queryResult.id,
                    modified: vm.queryResult.modified,
                    type: vm.queryResult.type,
                    title: vm.queryResult.title,
                    labels: JSON.stringify(vm.queryResult.labels),
                    descriptions: JSON.stringify(vm.queryResult.descriptions),
                    aliases: JSON.stringify(vm.queryResult.aliases),
                    claims: JSON.stringify(vm.queryResult.claims),
                    sitelinks: JSON.stringify(vm.queryResult.sitelinks)
                };

                wikidataService.storeWikidataEntityMetadata(obj).then(function (response) {
                    $log.info(response.status + " : " + response.data);
                }, function (response) {
                    $log.error(response.status + " : " + response.data);
                })['catch'](function (err) {
                    throw err;
                })['finally'](function () {
                    vm.savingWikidataResult = false;
                });
            }
        }, function (resposne) {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}

angular.module('app').controller('dashboardController', dashboardController);