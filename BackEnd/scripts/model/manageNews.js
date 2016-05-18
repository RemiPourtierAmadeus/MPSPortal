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
    query = query + " FROM T_News ";

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


/**
 * Function addNews. This function will create a new new according to data in newsParam.
 * @param userParams
 * @param success
 * @param fail
 */
exports.addNews = function (newsParam, success, fail) {
    newsParam[newsKeys[0]] = generateNewsID();
    /** set user id */

    var query = "INSERT INTO T_News ";
    var attributes = "(";
    var values = "(";
    var cpt = 0; //Will represent the number of field in parameters.
    for (var i = 0; i < newsKeys.length; i++) {
        if (newsParam.hasOwnProperty(newsKeys[i])) {
            if (cpt == 0) {
                attributes = attributes + newsKeys[i];
                values = values + "'" + newsParam[newsKeys[i]] + "'";
            }
            else {
                if (i != 4) {
                    values = values + ", " + "'" + newsParam[newsKeys[i]] + "'";
                }
                else {
                    values = values + ", " + newsParam[newsKeys[i]];
                }
                attributes = attributes + ", " + newsKeys[i];
            }
            cpt++;
        }
    }
    attributes = attributes + ")";
    values = values + ")";
    query = query + attributes + " VALUES " + values;
    console.log("query for adding user: " + query);

    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
    });
}

function updateNewsInDB(){

}

/**
 * This function generates a new id for the current news.
 * @returns {number}
 */
function generateNewsID() {
    var query="SELECT MAX(id) FROM MPS_Portal.T_News";
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
    });
    return 1;
}
