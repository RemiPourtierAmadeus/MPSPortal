/**
 * Manage projects. This file contains all the functions to manage user table:
 * - Add a project
 * - Update a project
 * - Delete a project
 * - Get projects list
 * @type {exports|module.exports}
 */

var mysql = require("mysql");
var connectionVariable = require('../core/config').connectionVariable;
var paramQ = require('../core/core').paramQ;
var fs = require('fs');

/**
 * Function updateProjects.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.updateProjects= function (data,success, fail){
    userParams[userKeys[0]] = userId;/** set user id */
    userParams[userKeys[4]] = "MD5('"+paramQ+generatedPassword+"')";/** Password : encoding  */
    userParams[userKeys[5]] = 1; /** Active : 1 => yes */
    userParams[userKeys[7]] = 1; /** Generated password : 1 => yes */

    var query="INSERT INTO T_User ";
    var attributes="(";
    var values="(";
    var cpt=0; //Will represent the number of field in parameters.
    for(var i=0; i<userKeys.length;i++){
        if (userParams.hasOwnProperty(userKeys[i])) {
            if (cpt == 0) {
                attributes = attributes+ userKeys[i];
                values= values+"'"+ userParams[userKeys[i]]+"'";
            }
            else {
                if(i!=4){
                    values= values+", "+"'"+userParams[userKeys[i]]+"'";
                }
                else{
                    values= values+", "+userParams[userKeys[i]];
                }
                attributes = attributes+", "+ userKeys[i];
            }
            cpt++;
        }
    }
    attributes=attributes+")";
    values=values+")";
    query= query + attributes+" VALUES "+values;
    console.log("query for adding user: "+query);

    connectionVariable.query( query, function (err, data) {
        if (err) throw err;
        else {
            success(data);
            updateUserIdInDB(userId, userTypeValue);
        }
    });
}

/**
 * Function addProject.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.addProject= function (data,success, fail){
    userParams[userKeys[0]] = userId;/** set user id */
    userParams[userKeys[4]] = "MD5('"+paramQ+generatedPassword+"')";/** Password : encoding  */
    userParams[userKeys[5]] = 1; /** Active : 1 => yes */
    userParams[userKeys[7]] = 1; /** Generated password : 1 => yes */

    var query="INSERT INTO T_User ";
    var attributes="(";
    var values="(";
    var cpt=0; //Will represent the number of field in parameters.
    for(var i=0; i<userKeys.length;i++){
        if (userParams.hasOwnProperty(userKeys[i])) {
            if (cpt == 0) {
                attributes = attributes+ userKeys[i];
                values= values+"'"+ userParams[userKeys[i]]+"'";
            }
            else {
                if(i!=4){
                    values= values+", "+"'"+userParams[userKeys[i]]+"'";
                }
                else{
                    values= values+", "+userParams[userKeys[i]];
                }
                attributes = attributes+", "+ userKeys[i];
            }
            cpt++;
        }
    }
    attributes=attributes+")";
    values=values+")";
    query= query + attributes+" VALUES "+values;
    console.log("query for adding user: "+query);

    connectionVariable.query( query, function (err, data) {
        if (err) throw err;
        else {
            success(data);
            updateUserIdInDB(userId, userTypeValue);
        }
    });
}

/**
 * Function deleteProjects.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.deleteProjects= function (data,success, fail){

}

/**
 * Function getProjects.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.getProjects= function (data,success, fail){
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
    query = query + " FROM T_Projects ";

    console.log("query for getProjects:" + query);
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