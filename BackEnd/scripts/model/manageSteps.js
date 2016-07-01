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
 * Function addStep. This function will create a step according to data in stepsParam through
 * the function savestep. Before, it generates the next id for the step.
 * @param success
 * @param fail
 */
exports.addStep = function (stepsParam, success, fail) {
    var query = "SELECT MAX(id) 'value' FROM MPS_Portal.TR_Step";
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            var stepID = data[0].value + 1;
            saveStep(stepID, stepsParam, success, fail);
        }
    });
}

/**
 * Function saveStep.
 * This function add directly the step into the database
 * @param stepID
 * @param stepsParam
 * @param success
 * @param fail
 */
function saveStep(stepID, stepsParam, success, fail) {
    stepsParam[stepKeys[0]] = stepID;
    var query = "INSERT INTO TR_Step ";
    var attributes = "(";
    var values = "(";
    var cpt = 0; //Will represent the number of field in parameters.
    for (var i = 0; i < stepKeys.length; i++) {
        if (stepsParam.hasOwnProperty(stepKeys[i])) {
            if (cpt == 0) {
                attributes = attributes + stepKeys[i];
                values = values + "" + stepsParam[stepKeys[i]] + "";
            }
            else {
                values = values + ", " + "'" + stepsParam[stepKeys[i]] + "'";
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
 * Function getSteps. This function get the list of all steps.
 * @param success
 * @param fail
 */
exports.getSteps = function (success, fail) {
    var query = "SELECT ";
    /**
     * We first build the query manually from the stepKeys (an array which contains all the
     * table attributes). We don't want to use the traditional "*" for security reasons.
     */
    for (var i = 0; i < stepKeys.length; i++) {
        if (i == 0) {
            query = query + "" + stepKeys[i];
        }
        else {
            query = query + ", " + stepKeys[i];
        }
    }
    query = query + " FROM TR_Step ";

    console.log("query for getsteps:" + query);
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
 * Function updateStep. This function will update a step according to data in stepsParams.
 * @param stepsParams
 * @param success
 * @param fail
 */
exports.updateStep = function (stepsParams, success, fail) {
    var paramsInQuery = "";
    /**
     * Start treatment of the request. We verify we have a user id in the request.
     */
    if (stepsParams[stepKeys[0]] >= 0) {
        /**
         * We start building the query. We get back all data we have from the http request.
         * Then we add the attributes to change into the parameters of the query : paramsInQuery.
         */
        var cpt = 0;
        for (var i = 1; i < stepKeys.length; i++) {
            if (stepsParams.hasOwnProperty(stepKeys[i])) {
                if (cpt == 0) {
                    paramsInQuery = stepKeys[i] + "='" + stepsParams[stepKeys[i]] + "'";
                }
                else {
                    paramsInQuery += ", " + stepKeys[i] + "='" + stepsParams[stepKeys[i]] + "'";
                }
                cpt++;
            }
        }
        /**
         * We create the final query.
         * @type {string}
         */
        paramsInQuery = "UPDATE TR_Step SET " + paramsInQuery + " WHERE id=" + stepsParams[stepKeys[0]];
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
        fail();
    }
}


/**
 * Function deleteSteps. This function delete a step from the database.
 * @param id
 * @param success
 * @param fail
 */
exports.deleteSteps = function (id, success, fail) {
    connectionVariable.query('DELETE FROM TR_Step WHERE id=?', id, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
    });
}
