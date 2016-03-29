var express = require('express'); // Utilisation du module express de nodejs.
var logger = require('morgan'); // Permet de gérer les logs et la coloration des messages.
var router = require('./scripts/routing/routes');
var database = require('./scripts/model/database');
var bodyParser = require('body-parser');
var app = express();

/**
 * Use the logger in the development mode
 */
app.use(logger('dev'));

/**
 * Database initialisation.
 */
database.initialiseDB();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * We define authorisation for http requests.
 */
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // We define the right to call the server.
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS"); // We define all methods we can use
    next();
});

/**
 * We define authorisation for http requests for every under domain
 * For instance: /users or /projects.
 */
app.options('/*', function(req, res){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    res.sendStatus(200);
});

/**
 * We define to app the routeur it has to use in the address localhost:3000/
 */
app.use('/',router);

/**
 * Creates a server at the address 3000.
 * @type {http.Server}
 */
var server = app.listen(3500, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});