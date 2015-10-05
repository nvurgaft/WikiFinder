/**
 * Created by Koby on 26-Sep-15.
 */
function wikidataService($http, $log, WIKIDATA_API_ROUTE) {

    var url = WIKIDATA_API_ROUTE;
    var serviceName = "wikidataService";

    return {
        get: function(qItem) {
            $log.debug("in " + serviceName + " fetching article data for qid: " + qItem);
            return $http.get(url + "/q", {
                params: {
                    qItem: qItem,
                    language: "en"
                }
            });
        },
        sendWikidataQuery: function(type, field) {
            $log.debug("in " + serviceName + " fetching wikidata page for qid -> type: " + type + ", field: "+ field);
            return $http.get(url + "/wikidata_api", {
                params: {
                    type: type,
                    field: field
                }
            });
        }
    }
}

angular.module('app').factory('wikidataService', wikidataService);