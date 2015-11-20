/**
 * Created by Koby on 25-Sep-15.
 */
var request = require('request');
var _ = require('underscore');

module.exports = function (router) {

    var router_point = "/api/viaf";
    var api_url = "https://www.viaf.org/viaf/";

    router.get(router_point, function (req, res) {
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
                res.send("Invalid Format");
                return;
        }

        var url = [api_url, viafId, suffix].join('');
        console.log("request url: " + url);
        request.get(url, function (error, response, body) {
            if (error) {
                res.status(500).send(error);
                return;
            }
            if (format === "json") {
                console.log(JSON.parse(response));
                res.json(body);
            } else {
                res.send(body);
            }
        });
    })
};