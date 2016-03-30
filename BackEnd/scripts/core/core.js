/**
 * File core. It contains all global variables we need for the
 * back end.
 * @type {exports|module.exports}
 */

var mysql = require("mysql");

/**
 * Initialisation of the variable to connect to mysql database.
 */
var connectionVariable = mysql.createConnection({
    host: "ncemysqlp4",
    port: "3315",
    user: "backend_portal",
    password: "Amadeus1",
    database: "MPS_Portal"
});

/**
 * Initialisation of the variable which contains all the attributes of the user table in the
 * database. We will use them in the user manager.
 * @type {string[]}
 */
var userKeys = ["user_id",
    "full_name",
    "email_address",
    "type",
    "password",
    "active"
];

/**
 * We exports the variable in order to be used in other files.
 * To imports one of the variable, you just have to write the following line:
 *      var userKeys = require('../core/core').userKeys; // To have userKeys
 * @type {{connectionVariable: *, userKeys: string[]}}
 */
module.exports = {
    connectionVariable: connectionVariable,
    userKeys: userKeys
};



