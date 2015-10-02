/**
 * Created by Koby on 26-Sep-15.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model("WikidataSubject", {
    name: String,
    instanceOf: String,
    viafIndentifier: Number,
    nliIdentifier: String
});