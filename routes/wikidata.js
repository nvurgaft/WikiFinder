/**
 * Created by Koby on 25-Sep-15.
 */
"use strict";
var request = require('request');
var _ = require('underscore');
var Q = require('q');
var Utils = require('./utils/wikidataRouteUtils');

module.exports = function (router) {

    var router_point = "/api/wikidata";

    /**
     * GET an rdf result using an item
     */
    router.get(router_point + '/wikidata_api', function (req, res) {

        let api_url = "https://wdq.wmflabs.org/api?q=",
            query = req.query.query;

        let url = [api_url, query].join('');
        request(url, function (error, response, body) {
            if (error) {
                res.status(500).send(error);
                return;
            }
            res.json(body);
        })
    });

    /**
     * GET a Wikidata entity using a QID
     */
    router.get(router_point + '/q', function (req, res) {

        let api_url = "https://www.wikidata.org/w/api.php",
            qItem = req.query.qItem,
            language = req.query.language;

        // if QID is not a number
        if (_.isNaN(qItem)) {
            res.status(400).json({"error": "QID " + qItem + " is not a number"});
            return;
        }

        let action = ['action', 'wbgetentities'].join('='),
            ids = ["ids", 'Q' + qItem].join('='),
            languages = ["languages", language].join('='),
            format = ["format", "json"].join('=');

        let address_params = [action, ids, languages, format].join('&');
        let url = [api_url, address_params].join('?');

        request(url, function (error, response, body) {
            if (error) {
                res.status(500).json(error);
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
        let search = req.query.search,
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
                res.status(500).json(error);
                return;
            }
            res.json(body);
        });
    });

    /**
     *  Search Wikidata entities by entity name
     */
    router.get(router_point + '/get-entities-by-qid', function (req, res) {
        let qItems = req.query.qItems,
            language = req.query.language,
            format = req.query.format;

        _.each(qItems, function (item) {
            if (_.isNaN(item)) {
                res.status(400).send({"error": "QID " + item + " is not a number"});
                return;
            }
        });

        let formattedItems = qItems.join('|');
        let url = [
            "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=",
            formattedItems,
            "&languages=", language,
            "&format=", format
        ].join("");

        request.get(url, function (error, response, body) {
            if (error) {
                res.status(500).json(error);
                return;
            }
            res.json(body)
        });
    });

    /**
     * Get a claim P for entity Q
     */
    router.get(router_point + '/get-claim-for-entity', function (res, req) {

        let entity = req.params.entity,
            claim = req.params.claim,
            language = req.params.language;

        if (!entity || entity.length === 0) {
            res.json({message: "entity does not exist in request"});
            return;
        }

        let url = [
            "https://www.wikidata.org/w/api.php?action=wbgetclaims",
            "&entity=" + entity,
            claim ? "&property=" + claim : "",
            language ? "&language=" + language : ""
        ].join("");

        request.get(url, function (error, response, body) {
            if (error) {
                res.status(500).json(error);
                return;
            }
            res.json(body)
        })
    });

    /**
     * Combine query calls to provide entity instance by name search
     */
    router.get(router_point + "/isHuman", function (req, res) {

        var search = req.query.search,      // full author name
            language = req.query.language,  // response data language
            format = req.query.format;      // format (json is nice)

        var url = [
            "https://www.wikidata.org/w/api.php?action=wbsearchentities",
            search ? "&search=" + search : "",
            language ? "&language=" + language : "",
            format ? "&format=" + format : ""
        ].join("");


        request.get(url, function (error, response, body) {
            if (error) {
                Q.reject(error);
            } else {
                return body;
            }
        }).then(function (res_url) {
            request.get(res_url, function (error, response, body) {
                if (error) {
                    res.status(500).json(error);
                } else {
                    var viafids = Utils.getInstanceOf(body); // 214 is viaf id
                    res.json(viafids);
                }
            });
        }, function (error) {
            res.status(500).json(error);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    });

    /**
     * Combine query calls to provide viaf id by name search
     */
    router.get(router_point + "/get-entities-by-name", function (req, res) {

            let entityName = req.query.entityName,      // full author name
                language = req.query.language,  // response data language
                format = req.query.format;      // format (json is nice)

            let url = [
                "https://www.wikidata.org/w/api.php?action=wbgetentities",
                "&sites=", language, "wiki",
                "&titles=", entityName,
                "&languages=", language,
                "&format=", format
            ].join("");

            request.get(url, function (error, response, body) {
                if (error) {
                    return Q.reject(error);
                }
                return body;
            }).then(function (response) {
                let viafids = Utils.getViafIdentifier(response); // 214 is viaf id
                res.json(viafids);
            }, function (error) {
                res.status(500).json(error);
            }).catch(function (err) {
                res.send(err);
            });
        }
    );
};
