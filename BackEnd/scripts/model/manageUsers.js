/**
 * Manage users. This file contains all the functions to manage user table:
 * - Add a user
 * - Update a user
 * - Delete a user
 * - Get users list
 * @type {exports|module.exports}
 */

var mysql = require("mysql");
var connectionVariable = require('../core/config').connectionVariable;
var userKeys = require('../core/core').userKeys;
var userTypes = require('../core/core').userTypes;
var passwordLength = require('../core/core').passwordLength;
var paramQ = require('../core/core').paramQ;
var fs = require('fs');
var nodemailer = require('nodemailer');
//var transporter = nodemailer.createTransport('smtps://muscsmtp3:25');

//smtps://user%40gmail.com:pass@smtp.gmail.com


/**
 * Function connect.
 * This function verifies user inputs and then validate the connection.
 * @param success
 * @param fail
 */
exports.connect = function (userParams, success, fail) {
    /**
     * We first build the query manually. We ask the user_id and the login from the login and the password
     * we have in userParams.
     */
    if (userParams.hasOwnProperty(userKeys[6]) && userParams.hasOwnProperty(userKeys[4])) {
        var query = "SELECT " + userKeys[0] + ", " + userKeys[7] + " FROM T_User WHERE "
            + userKeys[6] + "='" + userParams[userKeys[6]] + "' AND "
            + userKeys[4] + "=MD5('" + paramQ +userParams[userKeys[4]]+"')";
    }
    /**
     * We first build the query manually. We ask the user_id from the email address
     * we have in userParams.
     */
    else if(userParams.hasOwnProperty(userKeys[2]) ){
        var query = "SELECT " + userKeys[0] + " FROM T_User WHERE "
            + userKeys[2] + "='" + userParams[userKeys[2]] +"'";
    }


    console.log("query for connection:" + query);

    connectionVariable.query(query, function (err, data) {
        if (err) throw err;
        else {
            /**
             * After the error test, we would like to know if the query returns a value
             * If the query succeed (paramaters match), we just send the user id as confirmation
             * Else we create our own JSON with the value -1 which means that the user has not
             * been found.
             */
            if (typeof data[0] == 'undefined' && data[0]== null){
                console.log("User has not been found");
                data=[{"user_id":-1}];
            }
            success(data);
        }
        console.log('Data received from Db:\n');
        console.log(data);
    });
}

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
    query = query + " FROM T_User "; //WHERE login='remi.pourtier' AND password=MD5('TR4tQ0DL')

    console.log("query for getUsers:" + query);
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
function addUser(userId, userTypeValue, generatedPassword, userParams, success, fail) {
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
        var cpt=0;
        for (var i = 1; i < userKeys.length; i++) {
            if (userParams.hasOwnProperty(userKeys[i])) {
                if(userKeys[i]==="password"){
                    paramsInQuery = userKeys[i] + "=MD5('" + paramQ + userParams[userKeys[i]] + "')";
                }
                else if (cpt == 0) {
                    paramsInQuery = userKeys[i] + "='" + userParams[userKeys[i]] + "'";
                }
                else {
                    paramsInQuery += ", " + userKeys[i] + "='" + userParams[userKeys[i]] + "'";
                }
                cpt++;
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
exports.generateUserId = function (userParams, success, fail) {
    var typeValue = getCurrentUserType(userParams);
    var id = -1;
    if (typeValue !== "") {
        var query = "SELECT * FROM TR_LastUserId WHERE type='" + typeValue + "'";
        connectionVariable.query(query, function (err, data) {
            if (err) throw err;
            else {
                id = data[0].value + 1;
                var generatedPassword = generatePassword();
                addUser(id, typeValue, generatedPassword, userParams, success, fail);
            }
        });
    }
    else console.log("An error has occurred: The user doesn't have a type");
    return id;
}

/**
 * Function updateUserIdInDB.
 * This function will update the table TR_LastUserId in the database with the new generated user id.
 * It takes 2 parameters: The user id and the user type.
 * @param userId
 * @param userType
 */
function updateUserIdInDB(userId, userType) {
    var condition = "type = '" + userType + "'";
    var data = "value = '" + userId + "'";
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
function getCurrentUserType(userParams) {
    if (userParams.hasOwnProperty("type")) {
        var typeValue = userParams.type.toLowerCase();
        for (var i = 0; i < userTypes.length; i++) {
            if (userTypes[i] === typeValue) {
                return userTypes[i];
            }
        }
    }
    return "";
}

/**
 * Function generatePassword.
 * This function generates a password from every letter of the alphabet (lower case and capital)
 * and numbers. We randomly choose a letter or a number until the password has the password length
 * defined in core file.
 * @returns {string}
 */
function generatePassword() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var generatedPwd = '';
    for (var i = 0; i < passwordLength; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        generatedPwd += chars.substring(rnum, rnum + 1);
    }
    return generatedPwd;
}

/**
 * Function sendEmail.
 * This function sends an email to the new user with its generated password and ask him to
 * log in to change the password.
 * @param email
 */
function sendEmail(email) {
    console.log("into email: " + email);
    var smtpConfig = {
        host: 'smtp.gmail.com',//'mucsmtp3.amadeus.net',
        port: 465,
        secure: true,
        auth: {
            user: 'remi.pourtier@gmail.com',
            pass: '%110893%'
        } // use SSL
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    var mailData = {
        from: 'remi.pourtier@gmail.com',
        to: 'remi.pourtier@amadeus.com',
        subject: 'Message title',
        text: 'Plaintext version of the message',
        html: 'HTML version of the message'
    };
    // send mail with defined transport object
    transporter.sendMail(mailData, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}
