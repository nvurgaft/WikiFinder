/**
 * Created by Koby on 26-Sep-15.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model("WikidataEntity", {
    id: String,
    dateCreated: {
        type: Date
    },
    modified: {
        type: Date
    },
    type: String,
    title: String,
    // encode/decode using JSON.stringify/JSON.parse
    labels: String,
    descriptions: String,
    aliases: String,
    claims: String,
    sitelinks: String
});