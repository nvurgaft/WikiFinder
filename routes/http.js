/**
 * Created by Koby on 26-Sep-15.
 */
var request = require('request');

module.exports = function(router) {

    router.get('api/test/:url', function(req, res) {
        var url = req.params.url;
        request.get(url, function(error, response, body) {
            if (error) {
                res.send(error);
            }
            res.send(body);
        });
    });
};