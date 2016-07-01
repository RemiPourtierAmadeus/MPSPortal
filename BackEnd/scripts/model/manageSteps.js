/**
 * Manage steps. This file contains all the functions to manage step table:
 * - Add a step
 * - Update a step
 * - Delete a step
 * - Get step list
 * @type {exports|module.exports}
 */

var mysql = require("mysql");
var connectionVariable = require('../core/config').connectionVariable;
var fs = require('fs');
var stepKeys = require('../core/core').stepKeys;