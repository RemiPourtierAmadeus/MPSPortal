/**
 * Manage users. This file contains all the functions to manage user table:
 * - Add a user
 * - Update a user
 * - Delete a user
 * - Get users list
 * @type {exports|module.exports}
 */

var mysql = require("mysql");
var connectionVariable = require('../core/core').connectionVariable;
var userKeys = require('../core/core').userKeys;
var fs = require('fs');

/**
 * Function getUsers. This function get the list of all users.
 * @param success
 * @param fail
 */
exports.getUsers = function (success, fail) {
    console.log("Im in getuser");
    connectionVariable.query('SELECT * FROM T_User', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');
        console.log(rows);
    });
}

/**
 * Function addUser. This function will create a new user according to data in userParams.
 * @param userParams
 * @param success
 * @param fail
 */
exports.addUser = function (userParams, success, fail) {
    console.log('Im in adduser: ' + userParams);
    connectionVariable.query('INSERT INTO T_User SET ?', userParams, function (err, res) {
        if (err) throw err;
    });
}

/**
 * Function updateUsers. This function will update a user according to data in userParams.
 * @param userParams
 * @param success
 * @param fail
 */
exports.updateUsers = function (userParams, success, fail) {

    paramsInQuery = "";
    /**
     * Start treatment of the request. We verify we have a user id in the request.
     */
    if (userParams[userKeys[0]].length > 0) {
        /**
         * We start building the query. We get back all data we have from the http request.
         * Then we add the attributes to change into the parameters of the query : paramsInQuery.
         */
        for (var i = 1; i < userKeys.length; i++) {
            if (userParams.hasOwnProperty(userKeys[i])) {
                if (i == 1) {
                    paramsInQuery = userKeys[i] + "='" + userParams[userKeys[i]] + "'";
                }
                else {
                    paramsInQuery += ", " + userKeys[i] + "='" + userParams[userKeys[i]] + "'";
                }
            }
        }
        /**
         * We create the final query.
         * @type {string}
         */
        paramsInQuery = "UPDATE T_User SET  " + paramsInQuery + " WHERE user_id=" + userParams[userKeys[0]];

        /**
         * We update the data.
         */
        connectionVariable.query(paramsInQuery, function (err, res) {
            if (err) throw err;
        });

    }
    else {
        console.log("An error has occurred: No user_id found in the request.");
    }
}
