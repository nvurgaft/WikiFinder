/**
 * Created by Koby on 25-Sep-15.
 */
var request = require('request');
var _ = require('underscore');

module.exports = function (router) {

    var router_point = "/api/wikidata";

    /**
     * GET an rdf result using an item
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
     * GET a Wikidata entity using a QID
     */
    router.get(router_point + '/q', function (req, res) {

        var api_url = "https://www.wikidata.org/w/api.php";
        var qItem = req.query.qItem,
            language = req.query.language;

        // if QID is not a number
        if (_.isNaN(qItem)) {
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

    /**
     *  Search Wikidata entities by name
     *  Note: This method can return multiple entity items as a result
     */
    router.get(router_point + '/wbSearchEntities', function (req, res) {
        var search = req.query.search,
            language = req.query.language,
            format = req.query.format;

        var url = "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=" + search + "&language=" + language + "&format=" + format;
        request.get(url, function(error, response, body) {
            if (error) {
                res.json(error);
                return;
            }
            res.json(body);
        });
    });

    /**
     *  Search Wikidata entities by entity ID
     *  Note: This method can accept a list of entity items and resolve all of them
     */
    router.get(router_point + '/wbGetEntities', function (req, res) {
        var qItems = req.query.qItems,
            language = req.query.language,
            format = req.query.format;

        _.each(qItems, function(item) {
            if (_.isNaN(item)) {
                res.send({"error": "QID " + item + " is not a number"});
                return;
            }
        });

        var formattedItems = qItems.join('|');
        var url = ["https://www.wikidata.org/w/api.php?action=wbgetentities&ids=", formattedItems, "&languages=", language, "&format=", format]
        request.get(url, function(error, response, body) {
            if (error) {
                res.json(error);
                return;
            }
            res.json(body)
        });
    });

    router.get(router_point + '/test', function (req, res) {
        res.json({"message": "this is a test"});
    });
};