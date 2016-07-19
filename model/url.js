var mongoose = require('mongoose');
var shortid = require('shortid');

//var db = mongoose.createConnection(process.env.MONGOLAB_URI);


var Schema = mongoose.Schema;

var urlSchema = new Schema({
    originalUrl: { type: String},
    shortUrl: {type: String, 'default': shortid.generate}
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;