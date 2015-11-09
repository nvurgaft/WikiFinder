/**
 * Created by Koby on 09-Nov-15.
 */
var WikidataEntity = require("../models/WikidataEntity");

module.exports = function (router) {

    var apiRoute = "/api/entities";

    router.get(apiRoute, function (req, res) {
        WikidataEntity.find(function (err, entities) {
            if (err) {
                res.send(err);
            }
            res.json(entities);
        });
    });

    router.get(apiRoute + "/:qid", function (req, res) {
        WikidataEntity.findOne({"qid": req.params.qid}, function (err, entity) {
            if (err) {
                res.send(err);
            }
            res.json(entity);
        });
    });

    router.post(apiRoute, function (req, res) {
        WikidataEntity.create({
            qid: req.body.qid,
            dateCreated: Date.now(),
            lastUpdated: Date.now(),
            name: req.body.name,
            instanceOf: req.body.instanceOf,
            viafIndentifier: req.body.vid,
            nliIdentifier: req.body.nlid
        }, function (err, entity) {
            if (err) res.send(err);
            WikidataEntity.find(function (err, entities) {
                if (err) {
                    res.send(err);
                }
                res.json(entities);
            });
        });
    });

    router.put(apiRoute + "/:qid", function (req, res) {
        WikidataEntity.findOne({"qid": req.params.qid}, function (err, entity) {
            if (err) {
                res.send(err);
            }
            entity.qid = req.body.qid;
            entity.lastUpdated = Date.now(),
            entity.name = req.body.name;
            entity.instanceOf = req.body.instanceOf;
            entity.viafIndentifier = req.body.vid;
            entity.nliIdentifier = req.body.nlid;
            entity.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({"message": req.params.qid + " was successfully updated"});
                }
            });
        })
    });

    router.delete(apiRoute + "/:id", function (req, res) {
        WikidataEntity.findOne({'qid': req.params.qid}, function(err, entity) {
            if (err) res.send(err);
            entity.remove(function(err) {
                if (err) res.send(err);
                res.json({"message": req.params.qid + " was successfully deleted"})
            })
        });
    });
};