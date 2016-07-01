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
var newsKeys = require('../core/core').newsKeys;
var newsTypes = require('../core/core').newsTypes;
var newsSubTypes = require('../core/core').newsSubTypes;

/**
 * Function getLanguages. This function get the list of all languages.
 * @param success
 * @param fail
 */
exports.getLanguages = function (success, fail) {

}

/**
 * Function updateLanguages. This function will update a language according to data in newsParams.
 * @param languagesParams
 * @param success
 * @param fail
 */
exports.updateLanguages= function (languagesParams,success, fail) {

}



/**
 * Function deleteNews. This function delete a news from the database.
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
