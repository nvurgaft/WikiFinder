/**
 * Created by Koby on 25-Sep-15.
 */
var request = require('request');
var _ = require('underscore');

module.exports = function (router) {

    var router_point = "/api/viaf";
    var api_url = "http://www.viaf.org/viaf/";

    router.get(router_point + '/vid', function (req, res) {
        var viafId = req.query.vid,
            format = req.query.format;

        if (_.isNaN(viafId)) {
            // if QID is not a number
            res.json({"error": "VID " + viafId + " is not a number"});
            return;
        }

        var jsonFormat = "";
        switch (format) {
            case "json":
                jsonFormat = "/justlinks.json";
                break;
            case "html":
                jsonFormat = ""
                break;
            default:
                console.log("Invalid Format");
        }

        var url = [api_url, viafId, jsonFormat].join('');

        request.get(url, function (error, response, body) {
            if (error) {
                res.send(error);
                return;
            }
            if (format === "json") {
                res.json(body);
            } else {
                res.send(body);
            }
        });
    })
};