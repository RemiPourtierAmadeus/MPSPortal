/**
 * File routes. It makes the link between the back-end and the front-end.
 * In fact, it manages the behavior of the back-end according to the
 * http requests from the front-end.
 */

var express = require('express');

var router = express.Router();

var database = require('../model/database');

var stepManager = require('./../model/manageSteps');

/**
 * Function post. When the front-end is requesting a post on
 * on "nothing" (on "/") we know the user would like to log in.
 * In consequence, we verify the couple login/password and return the success or the failure of the request
 * updateUsers from userManager.
 */
router.post('/', function(req,res){
    var success = function (objetJSON) {
        var finalObject = [{success: 'true'}];
        console.log(finalObject);
        res.send(finalObject);
    };

    var fail = function(){
        var finalObject = [{success: 'false'}];
        res.send(finalObject);
        //res.sendStatus(500);
    };

    // Grab data from http request
    var data = req.body;
    console.log("In post, data received: "+data);

    stepManager.updateStep(data,success, fail);

});

/**
 * Function puts on projects. When the front-end is requesting a put on
 * projects, we verifies the success of the request and then call the method
 * addProjects from stepManager.
 */
router.put('/', function (req, res) {
    console.log(req.body);
    var success = function () {
        var finalObject = [{success: 'true'}];
        console.log(finalObject);
        res.send(finalObject);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    // Grab data from http request
    var data = req.body;

    stepManager.addStep(data,success, fail);
});

/**
 * Function get on projects. When the front-end is requesting a get on
 * projects, we verifies the success of the request and then call the method
 * getProjects from stepManager.
 */
router.get('/', function (req, res) {
    var success = function (objectJSON) {
        console.log("into success: "+objectJSON);
        res.send(objectJSON);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    stepManager.getSteps(success, fail);
});

/**
 * Function deletes on projects. When the front-end is requesting a removal of a project,
 * we verifies the success of the request and then call the method
 * deleteProjects from stepManager.
 */
router.delete('/', function (req, res) {
    console.log(req.body);
    var success = function () {
        var finalObject = [{success: 'true'}];
        console.log(finalObject);
        res.send(finalObject);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    // Grab data from http request
    var data = req.body;

    if(data.id>=0){
        stepManager.deleteSteps(data.id,success, fail);
    }
    else{
        fail();
    }
});

/**
 * We export the router in order to be imported in other files.
 */
module.exports = router;