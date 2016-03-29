/**
 * File routes. It makes the link between the back-end and the front-end.
 * In fact, it manages the behavior of the back-end according to the
 * http request from the front-end.
 */

var express = require('express');
// Création d'un routeur
var router = express.Router();

var database = require('../model/database');

var userManager = require('./../model/manageUsers');

// HTTP request: POST for users
/**
 * Function post on users. When the front-end is requesting a post on
 * users, we verifies the success of the request and then call the method
 * updateUsers from userManager.
 */
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

    userManager.updateUsers(data, success, fail);
});

/**
 * Function get on users. When the front-end is requesting a get on
 * users, we verifies the success of the request and then call the method
 * getUsers from userManager.
 */
router.get('/users', function (req, res) {
    var success = function (objetJSON) {
        console.log(objetJSON);
        res.send(objetJSON);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    userManager.getUsers(success, fail);

});


/**
 * Function put on users. When the front-end is requesting a put on
 * users, we verifies the success of the request and then call the method
 * addUsers from userManager.
 */
router.put('/users', function (req, res) {
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

    userManager.addUser(data,success, fail);

});

module.exports = router;