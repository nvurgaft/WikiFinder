/**
 * Created by Koby on 09-Nov-15.
 */
"use strict";
var WikidataEntity = require("../models/WikidataValue");

module.exports = function (router) {

    let apiRoute = "/api/entities";

    router.get(apiRoute, function (req, res) {
        WikidataEntity.find((err, entities) => {
            if (err) {
                res.send(err);
            }
            res.json(entities);
        });
    });

    router.get(apiRoute + "/:qid", function (req, res) {
        WikidataEntity.findOne({
            "qid": req.params.qid
        }, (err, entity) => {
            if (err) {
                res.send(err);
            }
            res.json(entity);
        });
    });

    router.post(apiRoute, function (req, res) {
        WikidataEntity.create({
            id: req.body.id,
            dateRecordCreated: new Date(),
            modified: req.body.modified,
            type: req.body.type,
            title: req.body.title,
            labels: req.body.labels,
            descriptions: req.body.descriptions,
            aliases: req.body.aliases,
            claims: req.body.claims,
            sitelinks: req.body.sitelinks,
            missing: req.body.missing || ""
        }, (err) => {
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
            entity.lastUpdated = Date();
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
        WikidataEntity.findOne({'qid': req.params.qid}, function (err, entity) {
            if (err) res.send(err);
            entity.remove(function (err) {
                if (err) res.send(err);
                res.json({"message": req.params.qid + " was successfully deleted"})
            })
        });
    });
};