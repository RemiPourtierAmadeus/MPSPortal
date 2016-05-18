/**
 * Manage news. This file contains all the functions to manage news table:
 * - Add a news
 * - Update a news
 * - Delete a news
 * - Get news list
 * @type {exports|module.exports}
 */

var mysql = require("mysql");
var connectionVariable = require('../core/config').connectionVariable;
var fs = require('fs');
var newsKeys = require('../core/core').newsKeys;
var newsTypes = require('../core/core').newsTypes;
var newsSubTypes = require('../core/core').newsSubTypes;

/**
 * Function getNews. This function get the list of all news.
 * @param success
 * @param fail
 */
exports.getNews = function (success, fail) {

    var query = "SELECT ";
    /**
     * We first build the query manually from the newsKeys (an array which contains all the
     * table attributes). We don't want to use the traditional "*" for security reasons.
     */
    for (var i = 0; i < newsKeys.length; i++) {
        if (i == 0) {
            query = query + "" + newsKeys[i];
        }
        else {
            query = query + ", " + newsKeys[i];
        }
    }
    query = query + " FROM T_News "; //WHERE login='remi.pourtier' AND password=MD5('TR4tQ0DL')

    console.log("query for getNews:" + query);
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
    });
}
