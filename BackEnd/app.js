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
 * Initialiser de la base de donnée.
 */
database.initialiseDB();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * Permet de définir les autorisations pour les requêtes HTTP.
 */
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Définit qui a le droit d'appeler le serveur.
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS"); // Définit les méthodes qu'on a le droit d'utiliser.
    next();
});

/**
 * Un fixe d'un problème dont je ne comprend pas l'origine ni la solution.
 * Le problème venait du fait que quand on essayait de <i>POST</i> le naviguateur web envoyait un <i>OPTIONS</i> à la place.
 */
app.options('/*', function(req, res){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    res.sendStatus(200);
});

/**
 * Permet de dire que l'on utilise le routeur nommé <i>router</i> pour la l'adresse <i>localhost:3000/</i>
 */
app.use('/',router);

/**
 * Permet de créer un serveur qui écoute sur le port 3000.
 * @type {http.Server}
 */
var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});