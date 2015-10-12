/**
 * Created by Koby on 26-Sep-15.
 */
function viafService($http, $log, VIAF_API_ROUTE, $q) {

    var url = VIAF_API_ROUTE;
    var serviceName = "viafService";

    return {
        get: function (vid, format) {
            $log.debug("in " + serviceName + " fetching article data for vid: " + vid);
            var deferred = $q.defer();
            $http.get(url + "/vid", {
                params: {
                    vid: vid,
                    format: format
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
        }
    }
}

angular.module('app').factory('viafService', viafService);