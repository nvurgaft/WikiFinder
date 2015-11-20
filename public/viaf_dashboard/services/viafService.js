/**
 * Created by Koby on 26-Sep-15.
 */
function viafService($http, $log, VIAF_API_ROUTE, $q) {

    var url = VIAF_API_ROUTE;
    var serviceName = "viafService";

    return {
        get: function (vid, format) {
            $log.debug("in " + serviceName + " fetching article data for vid: " + vid);
            return $http.get(url, {
                params: {
                    vid: vid,
                    format: format
                }
            }).then(function (response) {
                $log.debug(JSON.stringify(response));
                var data = response.data;
                if (format==='html' || format==='xml') {
                    $log.debug("format is " + format);
                    $log.debug("response: " + JSON.stringify(data));
                    if (typeof DOMParser != "undefined") {
                        var parser = new DOMParser();
                        return parser.parseFromString(data, "text/xml");
                    } else {
                        var doc = new ActiveXObject("Microsoft.XMLDOM");
                        doc.async = false;
                        return doc.loadXML(data);
                    }
                } else if (format==='json'){
                    return data;
                } else {
                    return data;
                }
            }, function(response) {
                return $q.reject(response.status + " : " + JSON.stringify(response.data));
            })['catch'](function (err) {
                throw err;
            })
        }
    }
}

angular.module('app').factory('viafService', viafService);