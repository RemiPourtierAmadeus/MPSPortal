require('../core/core.js');
var mysql = require("mysql");


/**
 * Function initialiseDB. It makes the connection to the database.
 */
exports.initialiseDB = function(){
    // First you need to create a connection to the db
    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to Db: ' + err);
            return;
        }
        console.log('Connection established');
    });

};

/**
 * Function disconnectDB. It makes the disconnection to the database.
 */
exports.disconnectDB = function(){

    con.end(function (err) {
        // The connection is terminated gracefully
        // Ensures all previously enqueued queries are still
    });
};
