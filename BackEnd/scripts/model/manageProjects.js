/**
 * Manage projects. This file contains all the functions to manage user table:
 * - Add a project
 * - Update a project
 * - Delete a project
 * - Get projects list
 * @type {exports|module.exports}
 */

var mysql = require("mysql");
var connectionVariable = require('../core/config').connectionVariable;
var paramQ = require('../core/core').paramQ;
var fs = require('fs');

exports.updateProjects= function (success, fail){

}