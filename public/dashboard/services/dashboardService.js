/**
 * Created by Koby on 25-Sep-15.
 */
function dashboardService($http, $log, WIKIDATA_API_ROUTE) {

    var serviceName = "dashboardService";
    var url = WIKIDATA_API_ROUTE + "/";

    return {
        sendWikidataRawQuery: function(query) {
            $log.debug(serviceName + " > sendWikidataRawQuery");
            return $http.get(url + query);
        }
    };
}

angular.module('app').factory('dashboardService', dashboardService);