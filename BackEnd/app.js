var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
    host: "ncemysqlp4",
    port: "3315",
    user: "backend_portal",
    password: "Amadeus1",
    database: "MPS_Portal"
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to Db: '+err);
        return;
    }
    console.log('Connection established');
});

var employee = { user_id: '2',
    full_name: 'Test',
    email_address: 'user@test.com',
    type: 'Admin',
    password: 'test'};

con.query('INSERT INTO T_User SET ?', employee, function(err,res){
    if(err) throw err;

});

con.query('SELECT * FROM T_User',function(err,rows){
    if(err) throw err;

    console.log('Data received from Db:\n');
    console.log(rows);
});

con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
});