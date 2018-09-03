const mongoose = require('mongoose'); //loading mongoose
mongoose.Promise = global.Promise;    //mongoose promises

mongoose.connect('mongodb://localhost:27017/urlshortener', {useNewUrlParser: true}); //setting dbpath

module.exports = mongoose; //exporting mongoose