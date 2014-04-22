/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * TADD MODULE VALIDATE CLASS
 *
 * This is an extension to the TADD Manager class.
 * It is used to validate node_modules as a TADD module
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

var paths   = require('../../../includes/paths.js'),
    fs      = require("fs");

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 |
 | Some basic checkups are preformed here to ensure the entire class can
 | preform it's duties.
 |
 */

var taddValidateClass = function() {

    // TODO : Validations
};

/*
 |--------------------------------------------------------------------------
 | Get valid Tadds
 |--------------------------------------------------------------------------
 |
 | Insert an array into this method so it can check each directory inside
 | the array for a valid Tadd.
 |
 */

taddValidateClass.prototype.getValidTadds = function(taddLocationArray) {

    if(typeof taddLocationArray !== 'object') {
        return false;
    }

    var validTaddArray = [];

    taddLocationArray.forEach(function(dir) {

        if(fs.existsSync(dir + paths.ds + "tadd_config.js")) {

            validTaddArray.push(dir);
        }
    });

    return validTaddArray;
};

// Export the module!
module.exports = taddValidateClass;