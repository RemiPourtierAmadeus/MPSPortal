/**
 * File core. It contains all global variables we need for the
 * back end.
 * @type {exports|module.exports}
 */

var mysql = require("mysql");

/**
 * Initialisation of the variable to connect to mysql database.
 */
var con = mysql.createConnection({
    host: "ncemysqlp4",
    port: "3315",
    user: "backend_portal",
    password: "Amadeus1",
    database: "MPS_Portal"
});
