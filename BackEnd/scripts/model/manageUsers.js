
/*exports.getUsers =  function(success,fail){

 };*/

var mysql = require("mysql");
var connectionVariable= require('../core/core');

// First you need to create a connection to the db
/*
var employee = {
    user_id: '3',
    full_name: 'Test',
    email_address: 'user@test.com',
    type: 'Admin',
    password: 'test'
};

con.query('INSERT INTO T_User SET ?', employee, function (err, res) {
    if (err) throw err;

});


connectionVariable.query('SELECT * FROM T_User', function (err, rows) {
    if (err) throw err;

    console.log('Data received from Db:\n');
    console.log(rows);
});


/*

exports.shopsChosen = function (shops, success, fail){

    // Cette requête permet de déselectionner les magasins précédemment choisis par l'utilisateur.
    var sqlrequest= "UPDATE shops SET id_user=NULL WHERE id_user IS NOT NULL;";

    // Si l'utilisateur a choisi des magasins.
    if (shops.length != 0) {
        // Alors on update chaque magasin choisi par l'utilisateur en bdd en concatenant l'update à la requete sql.
        shops.forEach(function (shopId) {
            sqlrequest += "UPDATE shops SET id_user=1 WHERE id=" + shopId + ";";
        });
        database.update(infosConnexion, sqlrequest, success, fail);
    }
    // Sinon on envoie la requete sql qui ne contient que la réinitialisation.
    else {
        database.update(infosConnexion,sqlrequest, success, fail);
    }
};*/