/**
 * Created by Nick on 12/7/2015.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model("WikidataProperty", {
    id: String,
    dateCreated: {
        type: Date
    },
    modified: {
        type: Date
    },
    type: String,
    instanceOf: String
});