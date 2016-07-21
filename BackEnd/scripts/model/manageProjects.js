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
var fs = require('fs');
var projectKeys = require('../core/core').projectKeys;

/**
 * Function updateProjects.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.updateProjects= function (data,success, fail){
    userParams[projectKeys[0]] = userId;/** set user id */
    userParams[projectKeys[4]] = "MD5('"+paramQ+generatedPassword+"')";/** Password : encoding  */
    userParams[projectKeys[5]] = 1; /** Active : 1 => yes */
    userParams[projectKeys[7]] = 1; /** Generated password : 1 => yes */

    var query="INSERT INTO T_Project ";
    var attributes="(";
    var values="(";
    var cpt=0; //Will represent the number of field in parameters.
    for(var i=0; i<projectKeys.length;i++){
        if (userParams.hasOwnProperty(projectKeys[i])) {
            if (cpt == 0) {
                attributes = attributes+ projectKeys[i];
                values= values+"'"+ userParams[projectKeys[i]]+"'";
            }
            else {
                if(i!=4){
                    values= values+", "+"'"+userParams[projectKeys[i]]+"'";
                }
                else{
                    values= values+", "+userParams[projectKeys[i]];
                }
                attributes = attributes+", "+ projectKeys[i];
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
exports.addProject= function (projectParam, data,success, fail){
    var query = "SELECT MAX(id) 'value' FROM T_Project";
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            var projectID = data[0].value + 1;
            saveProject(projectID, projectParam, success, fail);
        }
    });
}

function saveProject(projectID, projectParam, success, fail){
    projectParam[projectKeys[0]] = projectID;
    var query = "INSERT INTO T_Project ";
    var attributes = "(";
    var values = "(";
    var cpt = 0; //Will represent the number of field in parameters.
    for (var i = 0; i < projectKeys.length; i++) {
        if (projectParam.hasOwnProperty(projectKeys[i])) {
            if (cpt == 0) {
                attributes = attributes + projectKeys[i];
                values = values + "" + projectParam[projectKeys[i]] + "";
            }
            else {
                values = values + ", " + "'" + projectParam[projectKeys[i]] + "'";
                attributes = attributes + ", " + projectKeys[i];
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
            console.log("into else ?");
            var finalObject = [{id: projectID}];
            success(finalObject);
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
    console.log("projects params: " + userParams.id);
    connectionVariable.query('DELETE FROM T_Project WHERE id=?', userParams.id, function (err, data) {
        if (err) throw err;
        else {
            success(data);
        }
        console.log('Data received from Db:\n');
        console.log(data);
    });
}

/**
 * Function getProjects.
 * This function directly update a project from
 * @param data, success
 * @param fail
 */
exports.getProjects= function (success, fail){
    var query = "SELECT ";
    /**
     * We first build the query manually from the projectKeys (an array which contains all the
     * table attributes). We don't want to use the traditional "*" for security reasons.
     */
    for (var i = 0; i < projectKeys.length; i++) {
        if (i == 0) {
            query = query + "" + projectKeys[i];
        }
        else {
            query = query + ", " + projectKeys[i];
        }
    }
    query = query + " FROM T_Project ";

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


/**
 * Function getLanguagesFromId. This function returns the language according to language id.
 * @param id:number
 * @param success:function
 * @param fail:function
 */
exports.getLanguagesFromId = function (id, success, fail) {
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
    query = query + " FROM TR_Language WHERE id='"+id+"'";

    //console.log("query for getLanguages:" + query);
    /**
     * We run the query
     */
    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else if(data.length>0){
            success(data);
        }
        else{
            var finalObject = [{id: '-1'}];
            success(finalObject)
        }
        console.log('Data received from Db:\n');
        console.log(data);
    });

}