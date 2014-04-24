/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * TADD MANAGER CLASS
 *
 * This module manages everything concerning TADDs.
 * TADDs are Titanious Addons used to expand the system.
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

/*
 |--------------------------------------------------------------------------
 | Required modules
 |--------------------------------------------------------------------------
 */

var paths               = require('../../../includes/paths.js'),

    taddClass           = require(__dirname + paths.ds + "taddClass.js"),
    taddValidateClass   = require(__dirname + paths.ds + "taddValidateClass.js"),
    taddDatastoreClass  = require(__dirname + paths.ds + "taddDatastoreClass.js"),

    moduleSearchClass   = require("../lib/moduleSearchClass.js"),
    taddQueueClass      = require("../lib/taddQueueClass.js"),

    OptionsClass        = require(paths.__common + "options.js");

/*
 |--------------------------------------------------------------------------
 | Default options object
 |--------------------------------------------------------------------------
 |
 | This object will be used to create a new config file when one doesn't
 | exist already inside the root/config folder. It will also be
 | used to define the default values of these options.
 |
 */

var default_options = {


};

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 |
 | Instantiate some variables and use the options object to merge the
 | default options above with options inside the configuration file with
 | the same name as the module
 |
 */
var taddManagerClass = function(name, app) {

    // Merge the default options with the options set in the config file
    this.options = new OptionsClass(name).merge(default_options);

    // Instantiate the module search
    this.moduleSearch = new moduleSearchClass();
    // Instantiate the tadd validation
    this.taddValidate = new taddValidateClass();
    // Instantiate the tadd datastore
    this.taddDatastore = new taddDatastoreClass(app);
    // Instantiate the tadd datastore
    this.taddQueue = new taddQueueClass(this.taddDatastore);
};

/*
 |--------------------------------------------------------------------------
 | The initialisation of Titanious Addons
 |--------------------------------------------------------------------------
 */
taddManagerClass.prototype.init = function(callback) {

    var self = this;

    return self.moduleSearch.search(function(err, directories){

        if(err) {
            return callback(err);
        }

        var validated = self.taddValidate.getValidTadds(directories);

        self.taddDatastore.getStatus(validated, function(err, tadds){

            if(err) {
                return callback(err);
            }

            try {

                // Initialize the taddclass with everything about the tadd in it
                for(var tadd in tadds) {

                    // Require the index file of the tadd
                    var index = require(tadds[tadd].path);
                    // Then initialize it, as expected...
                    tadds[tadd].index = new taddClass(index, tadds[tadd], self.taddQueue);
                }

            } catch(e) {

                console.log("Something went wrong when initializing a tadd. Please correct: " + e);
            }

            // Inject available tadds into the object
            self.available = tadds;

            callback(null);
        });
    });
};

/*
 |--------------------------------------------------------------------------
 | The installation of Tadds
 |--------------------------------------------------------------------------
 */
taddManagerClass.prototype.install = function(name, sessid, callback) {

    // Install the tadd selected
    // We need the session id for authentication later on!!!
    this.available[name].index.install(sessid, callback);
};

/*
 |--------------------------------------------------------------------------
 | Destroy function
 |--------------------------------------------------------------------------
 |
 | Will be triggered at the end of the thread to close the connection
 | gracefully.
 |
 */
taddManagerClass.prototype.destroy = function() {


};

// Export the module!
module.exports = taddManagerClass;