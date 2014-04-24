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

    var validTaddObject = {};

    taddLocationArray.forEach(function(dir) {

        if(fs.existsSync(dir + paths.ds + "tadd.json")) {

            try {

                var json = fs.readFileSync(dir + paths.ds + "tadd.json");
                json = JSON.parse(json);

                var mname = dir.substr(dir.lastIndexOf("/") + 1);

                validTaddObject[mname] = {
                    name : json.name || mname,
                    mname : mname,
                    path : dir
                };

            } catch(e) {
                // TODO : Nice tidy up needed here
                console.log("Faulty JSON in Tadd: " + e);
            }
        }
    });

    return validTaddObject;
};

// Export the module!
module.exports = taddValidateClass;