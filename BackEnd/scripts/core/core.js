/**
 * File core. It contains all global variables we need for the
 * back end.
 * @type {exports|module.exports}
 *
 */

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
    "active",
    "login",
    "generatedPwd"
];
/**
 * Initialisation of the variable which contains all the user type possibilities.
 * @type {string[]}
 */
var userTypes = [
    "admin",
    "developer",
    "operational",
    "manager",
    "top_manager"
];


/**
 * We define the length of the generated password.
 * @type {number}
 */
var passwordLength = 8;

var paramQ= "quality";


/**
 * Initialisation of the variable which contains all the attributes of the news table in the
 * database. We will use them in the news manager.
 * @type {string[]}
 */
var newsKeys = ["id",
    "title",
    "content",
    "date",
    "hour",
    "type",
    "subtype",
    "newsFrom",
    "state"
];

/**
 * Initialisation of the variable which contains all the user type possibilities.
 * @type {string[]}
 */
var newsTypes = [
    "Info",
    "Infrastructure",
    "Process"
];

/**
 * Initialisation of the variable which contains all the user type possibilities.
 * @type {string[]}
 */
var newsSubTypes = [
    "Reports",
    "Outage",
    "Language",
    "Planning",
    "Communications/Events"
];


/**
 * We exports the variable in order to be used in other files.
 * To imports one of the variable, you just have to write the following line:
 *      var userKeys = require('../core/core').userKeys; // To have userKeys
 * @type {{connectionVariable: *, userKeys: string[]}}
 */
module.exports = {
    userKeys: userKeys,
    userTypes: userTypes,
    passwordLength : passwordLength,
    paramQ : paramQ,
    newsKeys : newsKeys,
    newsTypes : newsTypes,
    newsSubTypes : newsSubTypes
};



