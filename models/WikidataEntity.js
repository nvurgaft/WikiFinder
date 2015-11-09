/**
 * Created by Koby on 26-Sep-15.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model("WikidataEntity", {
    qid: Number,
    dateCreated: Date,
    lastUpdated: Date,
    name: String,
    instanceOf: String,
    viafIndentifier: Number,
    nliIdentifier: String
});