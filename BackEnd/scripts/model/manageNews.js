/**
 * Manage news. This file contains all the functions to manage user table:
 * - Add a news
 * - Update a news
 * - Delete a news
 * - Get news list
 * @type {exports|module.exports}
 */

var mysql = require("mysql");
var connectionVariable = require('../core/config').connectionVariable;
var fs = require('fs');

/**
 * Function getUsers. This function get the list of all users.
 * @param success
 * @param fail
 */
exports.getNews = function (success, fail) {

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
    query = query + " FROM T_User "; //WHERE login='remi.pourtier' AND password=MD5('TR4tQ0DL')

    console.log("query for getUsers:" + query);
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
