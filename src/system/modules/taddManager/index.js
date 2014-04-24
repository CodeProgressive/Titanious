/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * MAIN INDEX FILE FOR THE TADD MANAGER
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
 | Boot after everything has loaded
 |--------------------------------------------------------------------------
 |
 | Here we are sure that everything we need is properly loaded and the
 | Express server can now start booting
 |
 */

var taddManagerInit = function(err, app, self) {

    app.log.info("TaddManager : Booting...");

    // Require the "class" file
    var TaddManagerClass = require(__dirname + "/common/taddManagerClass.js");
    // Instantiate the mongodb object
    app.taddManager = new TaddManagerClass(exports.name, app);

    app.taddManager.init(function(err, available){

        if(err) {
            throw err;
        }

        // Inject available tadds into the object
        app.taddManager.available = available;

        app.log.info("TaddManager : Successfully completed booting");

        self.done();
    });
};

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
exports.name = "taddManager";

// When the module is being registered
exports.onRegister = function(app) {

    // Wait for taddManager to load completely before starting anything!
    app.waitFor(exports.name, "datastore", taddManagerInit);
};


/*
 |--------------------------------------------------------------------------
 | The boot class
 |--------------------------------------------------------------------------
 */

// Constructor
var taddManagerBoot = function() {};

module.exports.boot = taddManagerBoot;