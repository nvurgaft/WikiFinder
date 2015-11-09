/**
 * Created by Koby on 06-Oct-15.
 */
function databaseService($http, $log, $q, WIKIDATA_API_ROUTE) {

    var url = WIKIDATA_API_ROUTE;
    var serviceName = "databaseService";

    return {
        getEntities: function () {
            return $http.get(url + "/api/entities")
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    $log.error(serviceName + ": Error in getEntities -> " + response.status)
                    return $q.reject(response.status + " : " + response.data);
                })['catch'](function (err) {
                return $q.reject(err);
            });
        },
        getArticles: function () {
            return $http.get(ur + "/api/articles")
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    $log.error(serviceName + ": Error in getArticles -> " + response.status)
                    return $q.reject(response.status + " : " + response.data);
                })['catch'](function (err) {
                return $q.reject(err);
            });
        }
    }
}

angular.module('app').factory('databaseService', databaseService);