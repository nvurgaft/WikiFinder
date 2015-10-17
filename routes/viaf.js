/**
 * Created by Koby on 25-Sep-15.
 */
var request = require('request');
var _ = require('underscore');

module.exports = function (router) {

    var router_point = "/api/viaf";
    var api_url = "https://www.viaf.org/viaf/";

    router.get(router_point + '/viaf', function (req, res) {
        var viafId = req.query.vid,
            format = req.query.format;

        if (_.isNaN(viafId)) {
            res.json({"error": "VID " + viafId + " is not a number"});
            return;
        }

        var suffix = "/";
        switch (format) {
            case "json":
                suffix = "/justlinks.json";
                break;
            case "xml":
                suffix = "/viaf.xml";
                break;
            case "rdf":
                suffix = "/rdf.xml";
                break;
            case "html":
                suffix = "/";
                break;
            default:
                console.log("Invalid Format");
        }

        var url = [api_url, viafId, suffix].join('');
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