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
 * Initialisation of the variable which contains all the attributes of the language table in the
 * database. We will use them in the language manager.
 * @type {string[]}
 */
var languageKeys = [
    "id",
    "name"
];

/**
 * Initialisation of the variable which contains all the attributes of the step table in the
 * database. We will use them in the step manager.
 * @type {string[]}
 */
var stepKeys = [
    "id",
    "orderStep",
    "name"
];

/**
 * Initialisation of the variable which contains all the attributes of the project table in the
 * database. We will use them in the project manager.
 * @type {string[]}
 */
var projectKeys = [
    "id",
    "name",
    "version",
    "step_id_list",
    "language_id",
    "order",
    "jenkins_link",
    "active"
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
    newsSubTypes : newsSubTypes,
    languageKeys : languageKeys,
    stepKeys: stepKeys,
    projectKeys: projectKeys
};



