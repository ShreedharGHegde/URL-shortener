const express = require('express');  //loading express

const bodyParser = require('body-parser'); //loading body-parser

const _ = require('lodash'); //loading lo-dash

const {objectId} = require('mongodb'); //loading mogodb
 
const mongoose = require('./config/db')  //loading mogoose

const urls = require('./models/model'); //loading model

const urlRouter = require('./routes/route'); //loading routes

const app = express();  //loading/enabling/invoking express method
const port = 3000;      //initialising port

app.use(bodyParser.json()); //invoking json() to use json data

app.use('/urls', urlRouter)  //creating middle-ware

app.use((req, res, next) => {
    console.log(`${req.method}-${req.url}-${req.ip}-${new Date()}`);
    next();
})

app.listen(port, () => {
    console.log('listeninig to port', port);
})