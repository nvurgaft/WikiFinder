/**
 * Created by Koby on 25-Sep-15.
 */
var request = require('request');
var _ = require('underscore');

module.exports = function (router) {

    var router_point = "/api/wikidata";

    /**
     * query wikidata pages and meta data
     *
     * examples:
     *
     *  when we have property or entity id's we can use this service
     *  to fetch actual information
     *
     *  for example, when we have the item 42 and we want ot get his name (it's a human)
     *
     *  https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q42&languages=es&format=json
     *
     *  we will get something like
     *
     *   {"entities":{"Q42":{"type":"item","id":"Q42","labels":{"es":{"language":"es","value":"Douglas Adams"}}}},"success":1}
     */

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
     * query wikidata rdf item/property data
     *
     * examples:
     *
     *  get a subject using a property
     *  http://wdq.wmflabs.org/api?q=string[214:"113230702"]
     *  214 is the property (viaf identifier)
     *  113230702 is the value of the property
     *
     *  the result would be something like:
     *
     *  {"status":{"error":"OK","items":1,"querytime":"108ms","parsed_query":"STRING[214:'113230702']"},"items":[42]}
     *
     *  the items property in the json response is 42
     *  which belongs to Q42 to whom the viaf property belongs
     *  (the viaf id is an author identifier, while Q42 is the subject identifier)
     */

    var api_url = "https://wdq.wmflabs.org/api";
    var query_prefix = "?q=";

    // query operators
    // taken from: http://wdq.wmflabs.org/api_documentation.html
    var claim = "claim",
        noclaim = "noclaim",
        string = "string",
        tree = "tree",
        web = "web",
        around = "around",
        between = "between",
        quantity = "quantity",
        items = "items",
        link = "link",
        and = " AND ",
        or = " OR ";


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