/**
 * Created by Koby on 25-Sep-15.
 */
function dashboardService($http, $log, WIKIDATA_SERVICE_API) {

    var serviceName = "dashboardService";
    var url = WIKIDATA_SERVICE_API + "/";

    return {
        sendWikidataRawQuery: function(query) {
            $log.debug(serviceName + " > sendWikidataRawQuery");
            return $http.get(url + query);
        }
    };
}

angular.module('app').factory('dashboardService', dashboardService);