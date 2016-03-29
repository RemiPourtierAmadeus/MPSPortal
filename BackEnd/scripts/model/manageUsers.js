/*exports.getUsers =  function(success,fail){

 };*/

var mysql = require("mysql");
var connectionVariable = require('../core/core').connectionVariable;
var fs = require('fs');

// First you need to create a connection to the db
/*
 var employee = {
 user_id: '3',
 full_name: 'Test',
 email_address: 'user@test.com',
 type: 'Admin',
 password: 'test'
 };
 */

/**
 * Function getUsers. This function get the list of all users.
 * @param success
 * @param fail
 */
exports.getUsers = function (success, fail) {
    console.log("Im in getuser");
    connectionVariable.query('SELECT * FROM T_User', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');
        console.log(rows);
    });
}

/**
 * Function addUser. This function will create a new user according to data in userParams.
 * @param userParams
 * @param success
 * @param fail
 */
exports.addUser = function (userParams, success, fail) {
    console.log('Im in adduser: ' + userParams);
    connectionVariable.query('INSERT INTO T_User SET ?', userParams, function (err, res) {
        if (err) throw err;
    });
}

/**
 * Function updateUsers. This function will update a user according to data in userParams.
 * @param userParams
 * @param success
 * @param fail
 */
exports.updateUsers = function (userParams, success, fail) {
    var userKeys = ["user_id",
        "full_name",
        "email_address",
        "type",
        "password"];
    console.log('Im in update: ' + userParams);
    paramsInQuery = "";
    console.log("user params transformed: " + userParams);
    /*if (userParams.length != 0) {
     userParams.forEach(function (shopId) {
     sqlrequest += "UPDATE T_User SET id_user=1 WHERE id=" + shopId + ";";
     console.log("shop id:" + shopId);
     });
     }*/

    console.log("tain :" + userParams[userKeys[0]]);

    if (userParams[userKeys[0]].length>0) {
        for (var i = 1; i < userKeys.length; i++) {
            console.log("je rentre dans la boucle");
            if (userParams.hasOwnProperty(userKeys[i])) {
                console.log("value: " + userParams[userKeys[i]]);
                if (i == 1) {
                    paramsInQuery = userKeys[i] + "='" + userParams[userKeys[i]] + "'";
                }
                else {
                    paramsInQuery += ", " + userKeys[i] + "='" + userParams[userKeys[i]] + "'";
                }
            }
            console.log("in loop: " + userParams[i]);
        }

        console.log("part of query: " + paramsInQuery);
        paramsInQuery = "UPDATE T_User SET  " + paramsInQuery + " WHERE user_id=" + userParams[userKeys[0]];

        console.log("full query: " + paramsInQuery);

        if (userParams.hasOwnProperty('user_id')) {
            connectionVariable.query(paramsInQuery, function (err, res) {
                if (err) throw err;
            });

        }
    }
}
