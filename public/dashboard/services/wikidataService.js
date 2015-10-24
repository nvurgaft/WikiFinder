/**
 * Created by Koby on 26-Sep-15.
 */
function wikidataService($http, $log, WIKIDATA_API_ROUTE) {

    var url = WIKIDATA_API_ROUTE;
    var serviceName = "wikidataService";

    return {
        get: function (qItem, language) {
            $log.debug("in " + serviceName + " fetching article data for qid: " + qItem);
            return $http.get(url + "/q", {
                params: {
                    qItem: qItem,
                    language: language
                }
            });
        },
        sendWikidataQuery: function (fullQuery) {
            $log.debug("in " + serviceName + " fetching wikidata page for qid -> query:" + fullQuery);
            return $http.get(url + "/wikidata_api", {
                params: {
                    query: fullQuery
                }
            })
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
        getPropertyForItem: function(item, property, language) {
            $log.debug("in " + serviceName + " fetching wikidata entity ids");
            return $http.get(url + '/get-claim-for-entity', {
                params: {
                    entity: item,
                    claim: property,
                    language: language
                }
            });
        },
        getViafByName: function(entityName, language, format) {
            $log.debug("in " + serviceName + " fetching wikidata entity ids");
            return $http.get(url + '/get-entities-by-name', {
                params: {
                    entityName: entityName,
                    language: language,
                    format: format
                }
            });
        }
    };
}

angular.module('app').factory('wikidataService', wikidataService);