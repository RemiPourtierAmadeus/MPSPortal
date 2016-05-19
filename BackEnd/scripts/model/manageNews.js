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
function addNews(newsID, newsParam, success, fail) {
    newsParam[newsKeys[0]] = newsID;
    /** set user id */

    var query = "INSERT INTO T_News ";
    var attributes = "(";
    var values = "(";
    var cpt = 0; //Will represent the number of field in parameters.
    for (var i = 0; i < newsKeys.length; i++) {
        if (newsParam.hasOwnProperty(newsKeys[i])) {
            if (cpt == 0) {
                attributes = attributes + newsKeys[i];
                values = values + "" + newsParam[newsKeys[i]] + "";
            }
            else {
                values = values + ", " + "'" + newsParam[newsKeys[i]] + "'";
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

/**
 * Function addNewsInDB.
 *
 * First we get back the max of news id and then we call the function to add a news in T_News table
 */
exports.addNewsInDB = function (newsParam, success, fail) {
    var query = "SELECT MAX(id) 'value' FROM MPS_Portal.T_News";
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            console.log("data max: " + data[0].value);
            var newId = data[0].value + 1;
            //success(data);
            addNews(newId, newsParam, success, fail);
        }
    });
}

/**
 * This function generates a new id for the current news.
 * @returns {number}
 */
function generateNewsID() {
    var query = "SELECT MAX(id) FROM MPS_Portal.T_News";
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

/**
 * Function updateNews. This function will update a news according to data in newsParams.
 * @param newsParams
 * @param success
 * @param fail
 */
exports.updateNews = function (newsParams, success, fail) {
    var paramsInQuery = "";
    /**
     * Start treatment of the request. We verify we have a user id in the request.
     */
    if (newsParams[newsKeys[0]] >= 0) {
        /**
         * We start building the query. We get back all data we have from the http request.
         * Then we add the attributes to change into the parameters of the query : paramsInQuery.
         */
        var cpt = 0;
        for (var i = 1; i < newsKeys.length; i++) {
            if (newsParams.hasOwnProperty(newsKeys[i])) {
                if (cpt == 0) {
                    paramsInQuery = newsKeys[i] + "='" + newsParams[newsKeys[i]] + "'";
                }
                else {
                    paramsInQuery += ", " + newsKeys[i] + "='" + newsParams[newsKeys[i]] + "'";
                }
                cpt++;
            }
        }
        /**
         * We create the final query.
         * @type {string}
         */
        paramsInQuery = "UPDATE T_News SET " + paramsInQuery + " WHERE id=" + newsParams[newsKeys[0]];
        console.log("Query: " + paramsInQuery);
        /**
         * We update the data.
         */
        connectionVariable.query(paramsInQuery, function (err, data) {
            if (err) throw err;
            else {
                success(data);
            }
        });
    }
    else {
        console.log("An error has occurred: No id found in the request.");
    }
}

/**
 * Function deleteNews. This function delete a news from the database.
 * @param success
 * @param fail
 */
exports.deleteNews = function (newsParams, success, fail) {
    connectionVariable.query('DELETE FROM T_News WHERE id=?', newsParams.id, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
    });
}
