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
var userTypes = require('../core/core').userTypes;
var fs = require('fs');

/**
 * Function getUsers. This function get the list of all users.
 * @param success
 * @param fail
 */
exports.getUsers = function (success, fail) {

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
    query = query + " FROM T_User";

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
 * Function addUser. This function will create a new user according to data in userParams.
 * @param userParams
 * @param success
 * @param fail
 */
//exports.addUser = function (userId, userParams, success, fail) {
function addUser(userId, userTypeValue, userParams, success, fail){
    userParams["user_id"]=userId;
    connectionVariable.query('INSERT INTO T_User SET ?', userParams, function (err, data) {
        if (err) throw err;
        else {
            success(data);
            updateUserIdInDB(userId, userTypeValue);
        }
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
        console.log("An error has occurred: No user_id found in the request.");
    }
}

/**
 * Function deleteUsers. This function delete a user from the database.
 * @param success
 * @param fail
 */
exports.deleteUsers = function (userParams, success, fail) {

    console.log("User params: " + userParams.user_id);
    connectionVariable.query('DELETE FROM T_User WHERE user_id=?', userParams.user_id, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
        console.log('Data received from Db:\n');
        console.log(data);
    });
}

/**
 * Function generateUserId.
 * The function generates an id for the user according to the user type and the last id generated for the
 * last added user. Then it increments the last id and return the id value.
 * @param userParams
 */
exports.generateUserId = function(userParams, success, fail) {
    var typeValue=getCurrentUserType(userParams);
    var id= -1;
    if(typeValue!== ""){
        var query = "SELECT * FROM TR_LastUserId WHERE type='"+typeValue+"'";
        connectionVariable.query(query, function (err, data) {
            if (err) throw err;
            else {
                id= data[0].value+1;
                addUser(id, typeValue, userParams, success, fail);
            }
            console.log('Data received from Db:\n');
            console.log(id);
        });
    }
    else console.log("An error has occurred: The user doesn't have a type");
    return id;
}

/**
 * Function updateUserIdInDB.
 * @param userId
 * @param userType
 */
function updateUserIdInDB(userId, userType){
    var condition= "type = '"+userType+"'";
    var data= "value = '"+ userId+ "'";
    /**
     * We create the final query.
     * @type {string}
     */
    paramsInQuery = "UPDATE TR_LastUserId SET  " + data + " WHERE " + condition;
    console.log("Query: " + paramsInQuery);
    /**
     * We update the data.
     */
    connectionVariable.query(paramsInQuery, function (err, data) {
        if (err) throw err;

    });
}

/**
 * Function getCurrentUserType.
 * This function is checking from the userType list with import and the user characteristics we have in parameter if the
 * type exists and if yes what is the type.
 * @param userParams
 * @returns {string}
 */
function getCurrentUserType(userParams){
    if (userParams.hasOwnProperty("type")) {
        var typeValue=userParams.type.toLowerCase();
        for( var i=0; i<userTypes.length; i++){
            if(userTypes[i]===typeValue){
                return userTypes[i];
            }
        }
    }
    return "";
}