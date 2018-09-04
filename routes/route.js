const express = require('express');              //loading express
const _ = require('lodash');                    //loading lodash
const {urls} = require('../models/model');      //loading model
const router = express.Router();                //enabling router method
const objectId = require('mongodb').ObjectId;               //destructuring objectId

const shrturl = require('url');

const hash = require('shorthash');              //loading shorthash package

//find urls
router.get('/', (req, res) => {                  
   
    urls.find().then((urls) => res.send({
        urls
    }))
    .catch((err) => {
        res.send(err);
    })
})

//find url by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    urls.findById(id).populate('url','HashedUrl').then((url) => {
        if(url){
            res.send(url)
        }else{
            res.send({
                notice:'url not found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

//find url by hash
router.get('/hash/:hash', (req, res) => {

    let hash = req.params.hash;
    urls.findOne({HashedUrl:hash}, function(err, url){
        res.send(url);
    })
    .catch((err) => {
        send(err);
    })
})

//find by tag
router.get('/tag/:name', (req, res) => {
    let tag = req.params.name;
    urls.aggregate([{$match:{Tags:tag}}], function(err, url){
        if(url.length == 0){
            res.send({notice:'Tag not found'})
        }else{
            res.send(url)
        }
    })
})

//find by tags
router.get('/tags/:name', (req, res) => {
    let tag = req.query.name;
    urls.aggregate([{$match:{Tags:tag}}], function(err, url){
        if(url.length == 0){
            res.send({notice:'Tag not found'})
        }else{
            res.send(url)
        }
    })
}) 


//create url
router.post('/', (req, res) => {
    let doc = req.body;
    let body = _.pick(req.body,['Title','OriginalUrl','Tags']);
    let originalUrl = doc.OriginalUrl;
    shortened = hash.unique(originalUrl);       //generating short url
    let url = new urls(body);
    url.HashedUrl = shortened;                      //assining to urls
    url.save().then((url) => {                
        res.send({
            url
        });
    })
    .catch((err) => {
        res.send(err);
    })
});

//update url
router.put('/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body,['Title','OriginalUrl','Tags']);

    urls.findById(id).then((url) => {
        let title = body.Title
        let originalUrl = body.OriginalUrl
        let tags = body.Tags;

        url.Title = title;
        url.Tags = tags;
        url.OriginalUrl = originalUrl;

        url.save(function (err, updatedurl) {
            res.send(updatedurl);
        })
    })
    .catch((err) => {
        res.send(err);
    })

})


//delete url by id
router.delete('/:id',(req, res) => {
    let id = req.params.id;

    if(!objectId.isValid(id)){
        res.send({
            notice:'Invalid Id'
        })
    }

    urls.findByIdAndRemove(id).then((url) => {
        if(url){
            res.send({url, notice:'url deleted successfully'})
        }else{
            res.status(404).send({notice:'url already deleted'})
        }
    })
    .catch((err) => {
        res.send(err);
    });
})


module.exports = router;                //exporting router