/**
 * Created by Koby on 09-Nov-15.
 */
var ViafEntity = require("../models/ViafEntity");

module.exports = function (router) {

    var apiRoute = "/api/articles";

    router.get(apiRoute, function (req, res) {
        ViafEntity.find(function (err, entities) {
            if (err) {
                res.send(err);
            }
            res.json(entities);
        });
    });

    router.get(apiRoute + "/:vid", function (req, res) {
        ViafEntity.findOne({"vid": req.params.vid}, function (err, entity) {
            if (err) {
                res.send(err);
            }
            res.json(entity);
        });
    });

    router.post(apiRoute, function (req, res) {
        ViafEntity.create({
            vid: req.body.vid,
            dateCreated: Date.now(),
            lastUpdated: Date.now(),
            name: req.body.name,
        }, function (err, entity) {
            if (err) res.send(err);
            ViafEntity.find(function (err, entities) {
                if (err) {
                    res.send(err);
                }
                res.json(entities);
            });
        });
    });

    router.put(apiRoute + "/:vid", function (req, res) {
        ViafEntity.findOne({"vid": req.params.vid}, function (err, entity) {
            if (err) {
                res.send(err);
            }
            entity.vid = req.body.vid;
            entity.name = req.body.name;
            entity.lastUpdated = Date.now(),
            entity.instanceOf = req.body.instanceOf;
            entity.viafIndentifier = req.body.vid;
            entity.nliIdentifier = req.body.nlid;
            entity.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({"message": req.params.vid + " was successfully updated"});
                }
            });
        })
    });

    router.delete(apiRoute + "/:vid", function (req, res) {
        ViafEntity.findOne({'vid': req.params.vid}, function(err, entity) {
            if (err) res.send(err);
            entity.remove(function(err) {
                if (err) res.send(err);
                res.json({"message": req.params.vid + " was successfully deleted"})
            })
        });
    });
};