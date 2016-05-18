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
 * We export the router in order to be imported in other files.
 */
module.exports = router;