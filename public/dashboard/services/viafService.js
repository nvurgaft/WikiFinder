/**
 * Created by Koby on 26-Sep-15.
 */
function viafService($http, $log, VIAF_API_ROUTE) {

    var url = VIAF_API_ROUTE;
    var serviceName = "viafService";

    return {
        rawQuery: function(query) {
            return $http.get(url, {
                params: {
                    query: query
                }
            });
        }
    }
}

angular.module('app').factory('viafService', viafService);