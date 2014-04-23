/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * MAIN INDEX FILE FOR THE DATASTORE
 *
 * This module manages the data storage through databases
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

/*
 |--------------------------------------------------------------------------
 | Pre-class definitions
 |--------------------------------------------------------------------------
 |
 | Here we define some variables and methods required before the module
 | and adjacent class is actually loaded.
 |
 */

// The name of the module
exports.name = "datastore";

// When the module is being registered
exports.onRegister = function(app) {

    // Require the "class" file
    var DatastoreClass = require(__dirname + "/common/datastoreClass.js");
    // Instantiate the mongodb object
    app.datastore = new DatastoreClass(exports.name);
};

/*
 |--------------------------------------------------------------------------
 | The boot class
 |--------------------------------------------------------------------------
 */

// Constructor
var datastoreBoot = function(app) {

    var self = this;

    app.log.info("Datastore : Booting...");

    app.datastore.init(function(err){

        if(err) {
            throw err;
        }

        app.log.info("Datastore : Successfully completed booting");

        self.done();
    });

};

module.exports.boot = datastoreBoot;