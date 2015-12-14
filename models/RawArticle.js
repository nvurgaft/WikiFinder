/**
 * Created by Nick on 12/15/2015.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model("Article", {
    data: String
});