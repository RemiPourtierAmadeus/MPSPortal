/**
 * File routes. It makes the link between the back-end and the front-end.
 * In fact, it manages the behavior of the back-end according to the
 * http requests from the front-end.
 */

var express = require('express');

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
    console.log("Method post start: "+req.body);
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
    console.log("In post, data received: "+data);

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
 * Function puts on users. When the front-end is requesting a put on
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


/**
 * Function deletes on users. When the front-end is requesting a removal of a user,
 * we verifies the success of the request and then call the method
 * deleteUsers from userManager.
 */
router.delete('/users', function (req, res) {
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

    userManager.deleteUsers(data,success, fail);
});

/**
 * We export the router in order to be imported in other files.
 */
module.exports = router;