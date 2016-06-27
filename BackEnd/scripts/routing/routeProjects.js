/**
 * File routes. It makes the link between the back-end and the front-end.
 * In fact, it manages the behavior of the back-end according to the
 * http requests from the front-end.
 */

var express = require('express');

var router = express.Router();

var database = require('../model/database');

var projectManager = require('./../model/manageProjects');

/**
 * Function post. When the front-end is requesting a post on
 * on "nothing" (on "/") we know the user would like to log in.
 * In consequence, we verify the couple login/password and return the success or the failure of the request
 * updateUsers from userManager.
 */
router.post('/', function(req,res){
    var success = function (objetJSON) {
        console.log(objetJSON);
        res.send(objetJSON);
    };

    var fail = function(){
        var finalObject = [{success: 'false'}];
        res.send(finalObject);
        //res.sendStatus(500);
    };

    // Grab data from http request
    var data = req.body;
    console.log("In post, data received: "+data);

});


/**
 * We export the router in order to be imported in other files.
 */
module.exports = router;