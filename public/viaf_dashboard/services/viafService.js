/**
 * Created by Koby on 26-Sep-15.
 */
function viafService($http, $log, VIAF_API_ROUTE, $q) {

    var url = VIAF_API_ROUTE;
    var serviceName = "viafService";

    return {
        get: function (vid, format) {
            $log.debug("in " + serviceName + " fetching article data for vid: " + vid);
            return $http.get(url + "/viaf", {
                params: {
                    vid: vid,
                    format: format
                }
            }).then(function (response) {
                if (format==='html' || format==='xml') {
                    console.debug("format is " + format);
                    console.debug("response: " + JSON.stringify(response.data));
                    if (typeof DOMParser != "undefined") {
                        var parser = new DOMParser();
                        return parser.parseFromString(response.data, "text/xml");
                    } else {
                        var doc = new ActiveXObject("Microsoft.XMLDOM");
                        doc.async = false;
                        return doc.loadXML(response.data);
                    }
                } else {
                    return response;
                }
            })['catch'](function (err) {
                throw err;
            })
        }
    }
}

angular.module('app').factory('viafService', viafService);