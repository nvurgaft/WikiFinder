/**
 * Created by Koby on 06-Oct-15.
 */
function databaseService($http, $log, $q, WIKIDATA_SERVICE_API) {

    var url = WIKIDATA_SERVICE_API;
    var serviceName = "databaseService";

    return {
        newEntity: function(entity) {
            return $http.post(url + "/api/entities", entity)
            .then(function(response) {
                return response.data;
            }, function(response) {
                $log.error(serviceName + ": Error in newEntity -> " + response.status)
                return $q.reject(response.status + " : " + response.data);
            })
        },
        getEntities: function () {
            return $http.get(url + "/api/entities")
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    $log.error(serviceName + ": Error in getEntities -> " + response.status)
                    return $q.reject(response.status + " : " + response.data);
                });
        },
        getArticles: function () {
            return $http.get(ur + "/api/articles")
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    $log.error(serviceName + ": Error in getArticles -> " + response.status)
                    return $q.reject(response.status + " : " + response.data);
                });
        }
    }
}

angular.module('app').factory('databaseService', databaseService);