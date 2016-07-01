/**
 * Manage language. This file contains all the functions to manage language table:
 * - Add a language
 * - Update a language
 * - Delete a language
 * - Get language list
 * @type {exports|module.exports}
 */

var mysql = require("mysql");
var connectionVariable = require('../core/config').connectionVariable;
var fs = require('fs');
var languageKeys = require('../core/core').languageKeys;

/**
 * Function addLanguage. This function will create a language according to data in languagesParam through
 * the function saveLanguage. Before, it generates the next id for the language.
 * @param success
 * @param fail
 */
exports.addLanguage = function (languagesParam,success, fail) {
    var query = "SELECT MAX(id) 'value' FROM MPS_Portal.TR_Language";
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            var languageID = data[0].value + 1;
            saveLanguage(languageID, languagesParam, success, fail);
        }
    });
}

/**
 * Function saveLanguage.
 * This function add directly the language into the database
 * @param languageID
 * @param languagesParam
 * @param success
 * @param fail
 */
function saveLanguage(languageID, languagesParam, success, fail){
    languagesParam[languageKeys[0]]=languageID;
    var query = "INSERT INTO TR_Language ";
    var attributes = "(";
    var values = "(";
    var cpt = 0; //Will represent the number of field in parameters.
    for (var i = 0; i < languageKeys.length; i++) {
        if (languagesParam.hasOwnProperty(languageKeys[i])) {
            if (cpt == 0) {
                attributes = attributes + languageKeys[i];
                values = values + "" + languagesParam[languageKeys[i]] + "";
            }
            else {
                values = values + ", " + "'" + languagesParam[languageKeys[i]] + "'";
                attributes = attributes + ", " + languageKeys[i];
            }
            cpt++;
        }
    }
    attributes = attributes + ")";
    values = values + ")";
    query = query + attributes + " VALUES " + values;
    console.log("query for adding language: " + query);

    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
    });
}

/**
 * Function getLanguages. This function get the list of all languages.
 * @param success
 * @param fail
 */
exports.getLanguages = function (success, fail) {
    var query = "SELECT ";
    /**
     * We first build the query manually from the languageKeys (an array which contains all the
     * table attributes). We don't want to use the traditional "*" for security reasons.
     */
    for (var i = 0; i < languageKeys.length; i++) {
        if (i == 0) {
            query = query + "" + languageKeys[i];
        }
        else {
            query = query + ", " + languageKeys[i];
        }
    }
    query = query + " FROM TR_Language ";

    console.log("query for getLanguages:" + query);
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

/**
 * Function updateLanguages. This function will update a language according to data in languagesParams.
 * @param languagesParams
 * @param success
 * @param fail
 */
exports.updateLanguages= function (languagesParams,success, fail) {

}



/**
 * Function deleteLanguages. This function delete a language from the database.
 * @param id
 * @param success
 * @param fail
 */
exports.deleteLanguages = function (id, success, fail) {
    connectionVariable.query('DELETE FROM TR_Language WHERE id=?', id, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
    });
}
