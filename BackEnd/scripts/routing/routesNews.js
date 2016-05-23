/**
 * File routes. It makes the link between the back-end and the front-end.
 * In fact, it manages the behavior of the back-end according to the
 * http requests from the front-end.
 */


var express = require('express');

var router = express.Router();

var database = require('../model/database');

var newsManager = require('./../model/manageNews');

/**
 * Function get on users. When the front-end is requesting a get on
 * users, we verifies the success of the request and then call the method
 * getUsers from userManager.
 */
router.get('/', function (req, res) {
    var success = function (objetJSON) {
        console.log(objetJSON);
        res.send(objetJSON);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    newsManager.getNews(success, fail);
});

/**
 * Function puts on news. When the front-end is requesting a put on
 * news, we verifies the success of the request and then call the method
 * addUsers from newsManager.
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

    newsManager.addNewsInDB(data, success,fail);
});

/**
 * Function post on news. When the front-end is requesting a post on
 * news, we verifies the success of the request and then call the method
 * updateNews from newsManager.
 */
router.post('/', function(req,res){
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
    console.log("In post, data received: "+data);

    newsManager.updateNews(data, success, fail);
});

/**
 * Function deletes on news. When the front-end is requesting a removal of a news,
 * we verifies the success of the request and then call the method
 * deleteNews from newsManager.
 */
router.delete('/*', function (req, res) {
    console.log(req.body);
    console.log("url: "+req.url);
    var success = function () {
        var finalObject = [{success: 'true'}];
        console.log(finalObject);
        res.send(finalObject);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    // Grab data from http request
    var array=req.url.split("/");
    var data = array[1];
    console.log("data: "+data);
    if(data>=0){
        newsManager.deleteNews(data,success, fail);
    }
    else{
        console.log("A problem has occured while trying to delete a news");
    }
});
/**
 * We export the router in order to be imported in other files.
 */
module.exports = router;