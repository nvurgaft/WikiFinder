/**
 * Created by Koby on 25-Sep-15.
 */
var request = require('request');
var _ = require('underscore');
var Q = require('q');

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
            format = req.query.format,
            type = req.query.type;

        url = [
            "https://www.wikidata.org/w/api.php?action=wbsearchentities",
            search ? "&search=" + search : "",
            language ? "&language=" + language : "",
            format ? "&format=" + format : "",
            type ? "&type=" + type : ""
        ].join("");

        request.get(url, function (error, response, body) {
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

        _.each(qItems, function (item) {
            if (_.isNaN(item)) {
                res.send({"error": "QID " + item + " is not a number"});
                return;
            }
        });

        var formattedItems = qItems.join('|');
        var url = [
            "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=",
            formattedItems,
            "&languages=", language,
            "&format=", format
        ].join("");

        request.get(url, function (error, response, body) {
            if (error) {
                res.json(error);
                return;
            }
            res.json(body)
        });
    });

    /**
     * Get a claim P for entity Q
     */
    router.get(router_point + '/wbgetclaims', function (res, req) {

        var entity = req.params.entity,
            claim = req.params.claim,
            language = req.params.language;

        if (!entity || entity.length === 0) {
            res.json({message: "entity does not exist in request"});
            return;
        }

        var url = [
            "https://www.wikidata.org/w/api.php?action=wbgetclaims",
            "&entity=" + entity,
            claim ? "&property=" + claim : "",
            language ? "&language=" + language : ""
        ].join("");

        request.get(url, function (error, response, body) {
            if (error) {
                res.json(error);
                return;
            }
            res.json(body)
        })
    });

    /**
     * Combine query calls to provide viaf id by name search
     */
    router.get(router_point + "/getviaf", function (req, res) {

        var search = req.query.search,      // full author name
            language = req.query.language,  // response data language
            format = req.query.format;      // format (json is nice)

        url = [
            "https://www.wikidata.org/w/api.php?action=wbsearchentities",
            search ? "&search=" + search : "",
            language ? "&language=" + language : "",
            format ? "&format=" + format : ""
        ].join("");


        function firstPromise(argUrl) {
            var deferred = Q.defer();
            request.get(argUrl, function (error, response, body) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(body);
                }
            });
            return deferred.promise;
        };

        firstPromise(url)
            .then(function (response) {

                var obj = JSON.parse(response);
                var ids = _.pluck(obj.search, 'id');
                var url = [
                    "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=",
                    ids.join('|'),
                    "&languages=", "en",
                    "&format=", "json"
                ].join("");

                request.get(url, function (error, response, body) {
                    if (error) {
                        res.json(error);
                        return;
                    } else {
                        var viafids = [];
                        var obj = JSON.parse(body).entities;
                        for (var entity in obj) {
                            if (obj[entity].claims.P214) {
                                viafids.push(obj[entity].claims.P214[0].mainsnak.datavalue.value);
                            }
                        }
                        res.json(viafids);
                    }
                });
            }, function (response) {
                res.json(response.error);
            });

    });

    router.get(router_point + '/test', function (req, res) {
        res.json({"message": "this is a test"});
    });
};