
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "ncemysqlp4",
    port: "3315",
    user: "backend_portal",
    password: "Amadeus1",
    database: "MPS_Portal"
});

exports.initialiseBDD = function(){
    // First you need to create a connection to the db
    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to Db: ' + err);
            return;
        }
        console.log('Connection established');
    });

}