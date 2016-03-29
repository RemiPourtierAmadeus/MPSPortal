/*exports.getUsers =  function(success,fail){

 };*/

var mysql = require("mysql");
var connectionVariable = require('../core/core').connectionVariable;

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
    for (var i = 0; i < userKeys.length; i++) {
        console.log("in loop: " + userParams[i]);
    }
    /*userParams.forEach(function(userIDS){
     console.log(userIDS);
     });*/
    if (userParams.hasOwnProperty('user_id')) {
        connectionVariable.query('UPDATE INTO T_User SET ? ', userParams, function (err, res) {
            if (err) throw err;
        });
    }
}

