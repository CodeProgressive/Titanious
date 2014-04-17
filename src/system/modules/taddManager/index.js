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

    // Require the "class" file
    var TaddManagerClass = require(__dirname + "/common/taddManagerClass.js");
    // Instantiate the mongodb object
    app.taddManager = new TaddManagerClass(exports.name);
};


/*
 |--------------------------------------------------------------------------
 | The boot class
 |--------------------------------------------------------------------------
 */

// Constructor
var taddManagerBoot = function(app) {

    var self = this;

    app.log.info("TaddManager : Booting...");

    app.taddManager.init(function(err){

        if(err) {
            throw err;
        }

        app.log.info("TaddManager : Successfully completed booting");

        self.done();
    });

};

module.exports.boot = taddManagerBoot;