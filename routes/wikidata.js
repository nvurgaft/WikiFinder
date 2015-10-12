/**
 * Created by Koby on 25-Sep-15.
 */
var request = require('request');
var _ = require('underscore');

module.exports = function (router) {

    var router_point = "/api/wikidata";

    var base_url = "https://www.wikidata.org/w/api.php";

    var action = "action=wbgetentities",
        titles = "titles=Main%20Page",
        props = "props=labels",
        rvprop = "rvprop=content",
        format = "format=json",
        ids = "ids=42",
        languages = "languages=es";

    var address_params = [action, ids, languages, format].join('&');
    var url = [base_url, address_params].join('?');

    /**
     * GET an rdf result using a n item
     */
    router.get(router_point + '/wikidata_api', function (req, res) {

        var api_url = "https://wdq.wmflabs.org/api?q=",
            type = req.query.type,
            field = req.query.field;

        var url = [api_url, type, field].join('');

        request(url, function (error, response, body) {
            if (error) {
                res.send(error);
                return;
            }
            res.json(body);
        })
    });

    /**
     * GET a wikidata article using a QID
     */
    router.get(router_point + '/q', function (req, res) {

        var api_url = "https://www.wikidata.org/w/api.php";
        var qItem = req.query.qItem;
        var language = req.query.language;

        if (_.isNaN(qItem)) {
            // if QID is not a number
            res.json({"error": "QID " + qItem + " is not a number"});
            return;
        }

        var action = ['action', 'wbgetentities'].join('='),
            ids = ["ids", 'Q' + qItem].join('='),
            languages = ["languages", language].join('='),
            format = ["format", "json"].join('=');

        var address_params = [action, ids, languages, format].join('&');
        var url = [api_url, address_params].join('?');

        console.log("url : " + url);
        request(url, function (error, response, body) {
            if (error) {
                res.json(error);
                return;
            }
            res.json(body);
        });
    });

    router.get(router_point + '/test', function (req, res) {
        res.json({"message": "this is a test"});
    });
};