/**
 * Created by Guillaume on 08/07/2015.
 */

var express = require('express');
// Création d'un routeur
var router = express.Router();

var database = require('./../models/database');

var userManager = require('./../model/manageUsers');

// HTTP request: POST for users
router.post('/users', function(req,res){
    console.log(req.body);
    var success = function () {
        var finalObject = 'success';
        console.log(finalObject);
        res.send(finalObject);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    // Grab data from http request
    var data = req.body;

    database.shopsChosen(data, success, fail);
});

// HTTP request: Get for users
router.get('/users', function (req, res) {
    var success = function (objetJSON) {
        console.log(objetJSON);
        res.send(objetJSON);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    database.getShopsChosen(success, fail);

});