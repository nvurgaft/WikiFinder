/**
 * Created by Koby on 25-Sep-15.
 */
var request = require('request');

module.exports = function(router) {

    var api_url = "http://www.viaf.org/viaf/";

    router.get('api/viaf:query', function(req, res) {
        var url = req.params.query;
        request.get(url, function(error, response, body) {
            if (error) {
                res.send(error);
            }
            res.send(body);
        });
    })
};