/**
 * File routes. It makes the link between the back-end and the front-end.
 * In fact, it manages the behavior of the back-end according to the
 * http requests from the front-end.
 */

var express = require('express');

var router = express.Router();

var database = require('../model/database');

var userManager = require('./../model/manageProjects');


/**
 * We export the router in order to be imported in other files.
 */
module.exports = router;