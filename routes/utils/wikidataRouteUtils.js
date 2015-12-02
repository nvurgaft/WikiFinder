/**
 * Created by Koby on 17-Oct-15.
 */
"use strict";
var request = require('request');

module.exports = {

    getInstanceOf: function (doc) {
        // returns the Instance Of (P31) of the queried Q
        // the result if another Q (Instance Of Human is 5 because Human is Q5)
        let values = [], obj = JSON.parse(doc).entities;
        for (let entity in obj) {
            let prop = obj[entity].claims['P31'];
            if (prop) {
                values.push(prop[0].mainsnak.datavalue.value['numeric-id']);
            }
        }
        return values;
    },
    getViafIdentifier: function (doc) {
        // returns the argument Property value of the response
        let values = [],
            obj = JSON.parse(doc).entities;
        for (let entity in obj) {
            let prop = obj[entity].claims['P214'];
            if (prop) {
                values.push(prop[0].mainsnak.datavalue.value);
            }
        }
        return values;
    }
};