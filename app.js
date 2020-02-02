const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Activity = require('./models/activity');

//app.use("./api", router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/OSDB1');

app.use(function(req, res, next){
    console.log("we route");
    next();
})

app.get('/', function(req, res){
    res.json({message: "best"});
});

app.get('/api/activities', function(req, res){
    console.log('get activities');
    Activity.find({}).then(eachOne =>{
        res.json(eachOne);
    })
})

app.post('/api/activities', function (req, res) {
    Activity.create({
        activity_name: req.body.activity_name,
        quantity: req.body.quantity
    }).then(activity =>{
        res.json(activity)
    });
});

app.get('/api/activities/:activity_id', function(req, res) {

    Activity.findById(req.params.activity_id).then(function(err,
        activity){
            if(err){
                res.send(err);
            }
            res.json(activity)
        })
    
})
    

app.listen(3000);
console.log('starting');
