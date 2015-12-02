/**
 * Created by Koby on 26-Sep-15.
 */
"use strict";
var request = require('request');

module.exports = function(router) {

    router.get('api/test/:url', function(req, res) {
        let url = req.params.url;
        request.get(url, function(error, response, body) {
            if (error) {
                res.status(500).send(error);
                return;
            }
            res.send(body);
        });
    });
};