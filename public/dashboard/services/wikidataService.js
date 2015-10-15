/**
 * Created by Koby on 26-Sep-15.
 */
function wikidataService($http, $log, WIKIDATA_API_ROUTE, $q) {

    var url = WIKIDATA_API_ROUTE;
    var serviceName = "wikidataService";

    return {
        get: function (qItem) {
            $log.debug("in " + serviceName + " fetching article data for qid: " + qItem);
            var deferred = $q.defer();
            $http.get(url + "/q", {
                params: {
                    qItem: qItem,
                    language: "en"
                }
            })
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (response) {
                    deferred.reject(response.status + " : " + response.data);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        sendWikidataQuery: function (type, field) {
            $log.debug("in " + serviceName + " fetching wikidata page for qid -> type: " + type + ", field: " + field);
            var deferred = $q.defer();
            $http.get(url + "/wikidata_api", {
                params: {
                    type: type,
                    field: field
                }
            })
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (response) {
                    deferred.reject(response.status + " : " + response.data);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        getEntitiesByName: function(search, language, format) {
            $log.debug("in " + serviceName + " fetching wikidata entity names");
            return $http.get(url + '/wbSearchEntities', {
                params: {
                    search: search,
                    language: language,
                    format: format
                }
            });
        },
        getEntitiesByQid: function(item, property, language) {
            $log.debug("in " + serviceName + " fetching wikidata entity ids");
            return $http.get(url + '/wbgetclaims', {
                params: {
                    entity: item,
                    claim: property,
                    language: language
                }
            });
        },
        getViafByName: function(search, language, format) {
            $log.debug("in " + serviceName + " fetching wikidata entity ids");
            return $http.get(url + '/getviaf', {
                params: {
                    search: search,
                    language: language,
                    format: format
                }
            });
        }
    };
}

angular.module('app').factory('wikidataService', wikidataService);