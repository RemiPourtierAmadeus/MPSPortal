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

/**
 * Function updateProjects.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.updateProjects= function (data,success, fail){

}

/**
 * Function addProject.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.addProject= function (data,success, fail){

}

/**
 * Function deleteProjects.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.deleteProjects= function (data,success, fail){

}

/**
 * Function getProjects.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.getProjects= function (data,success, fail){
    var query = "SELECT ";
    /**
     * We first build the query manually from the userKeys (an array which contains all the
     * table attributes). We don't want to use the traditional "*" for security reasons.
     */
    for (var i = 0; i < userKeys.length; i++) {
        if (i == 0) {
            query = query + "" + userKeys[i];
        }
        else {
            query = query + ", " + userKeys[i];
        }
    }
    query = query + " FROM T_Projects ";

    console.log("query for getProjects:" + query);
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
        console.log('Data received from Db:\n');
        console.log(data);
    });
}