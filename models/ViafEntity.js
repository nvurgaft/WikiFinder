/**
 * Created by Koby on 09-Nov-15.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model("ViafEntity", {
    vid: Number,
    dateCreated: Date,
    lastUpdated: Date,
    name: String
});