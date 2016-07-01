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



/**
 * Function addStep. This function will create a language according to data in languagesParam through
 * the function saveLanguage. Before, it generates the next id for the language.
 * @param success
 * @param fail
 */
exports.addStep = function (languagesParam, success, fail) {
    var query = "SELECT MAX(id) 'value' FROM MPS_Portal.TR_Language";
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            var languageID = data[0].value + 1;
            saveStep(languageID, languagesParam, success, fail);
        }
    });
}

/**
 * Function saveStep.
 * This function add directly the language into the database
 * @param languageID
 * @param languagesParam
 * @param success
 * @param fail
 */
function saveStep(languageID, languagesParam, success, fail) {
    languagesParam[stepKeys[0]] = languageID;
    var query = "INSERT INTO TR_Language ";
    var attributes = "(";
    var values = "(";
    var cpt = 0; //Will represent the number of field in parameters.
    for (var i = 0; i < stepKeys.length; i++) {
        if (languagesParam.hasOwnProperty(stepKeys[i])) {
            if (cpt == 0) {
                attributes = attributes + stepKeys[i];
                values = values + "" + languagesParam[stepKeys[i]] + "";
            }
            else {
                values = values + ", " + "'" + languagesParam[stepKeys[i]] + "'";
                attributes = attributes + ", " + stepKeys[i];
            }
            cpt++;
        }
    }
    attributes = attributes + ")";
    values = values + ")";
    query = query + attributes + " VALUES " + values;
    console.log("query for adding steps: " + query);

    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
    });
}

/**
 * Function getSteps. This function get the list of all languages.
 * @param success
 * @param fail
 */
exports.getSteps = function (success, fail) {
}

/**
 * Function updateStep. This function will update a language according to data in languagesParams.
 * @param languagesParams
 * @param success
 * @param fail
 */
exports.updateStep = function (languagesParams, success, fail) {
}


/**
 * Function deleteSteps. This function delete a language from the database.
 * @param id
 * @param success
 * @param fail
 */
exports.deleteSteps = function (id, success, fail) {
}
