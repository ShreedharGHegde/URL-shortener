const mongoose = require('mongoose'); //loading mongoose
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema; //definging schema

urlSchema = new Schema({

    Title:{
        type:String,
        required:true
    },

    OriginalUrl:{
        type:String,
        required:true
    },

    Tags:{ 
        type:[String] ,
        required:true},

    CreatedAt:{type:Date, default:Date.now},

    HashedUrl:{
        type:String
    }

})

const urls = mongoose.model('urls', urlSchema); //creating model

module.exports = {                              //exporting urls
    urls 
}