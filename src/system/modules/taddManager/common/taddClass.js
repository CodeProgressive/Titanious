/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * TADD MODULE CLASS
 *
 * This is the mother class of every tadd validated
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

/*
 |--------------------------------------------------------------------------
 | Required global variables
 |--------------------------------------------------------------------------
 */

var paths           = require('../../../includes/paths.js'),
    ssh_sessions    = require(paths.__static + 'ssh_sessions.js');

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 */

var taddClass = function(Index, tadd, queue) {

    // We need 'this' inside the prototype configure
    var self = this;

    // Add the queue
    this.queue = queue;

    // Add the tadd
    this.tadd = tadd;

    // Extend the configure of this class
    Index.prototype.configure = function(type, options, sessid, callback){
        self.configure(type, options, sessid, callback);
    };

    // Now create the object inside this one for future use
    this.index = new Index();
};

/*
 |--------------------------------------------------------------------------
 | Exec function for the controller prototype
 |--------------------------------------------------------------------------
 */

taddClass.prototype.exec = function(sessid) {

    // We passthrough a function containing the actual function
    return function(command, callback) {

        // We need the exec from the ssh_sessions for everything to work
        ssh_sessions.exec(sessid, command, callback);
    };
};

/*
 |--------------------------------------------------------------------------
 | Configure method
 |--------------------------------------------------------------------------
 */
taddClass.prototype.configure = function(type, options, sessid, callback) {

    switch(type) {

        case "installation" :

            for(var coac in options.install) {

                // Fetch controller and action (returned in an object)
                var cana = this.getControllerAndAction(options.install[coac]);

                // Set the exec function including the session
                cana.controller.prototype.exec = this.exec(sessid);
                // Initialize the controller now
                var controller = new cana.controller();

                // Add the installation to the queue
                this.queue.addToQueue(this.tadd, { action : cana.action, controller : controller, callback : callback });
            }

            break;
    }
};

/*
 |--------------------------------------------------------------------------
 | Initialize controller
 |--------------------------------------------------------------------------
 */

taddClass.prototype.getControllerAndAction = function(call) {

    var raw = call.split("@"),
        controllerPath = raw[0],
        action = raw[1] || "index";

    try {

        var controller = require(this.tadd.path + paths.ds + paths.controllers + controllerPath + ".js");

        return {
            controller : controller,
            action : action
        };

    } catch(e) {

        console.log("Something went wrong when initializing a tadd. Please correct: " + e);
    }
};

/*
 |--------------------------------------------------------------------------
 | Install method
 |--------------------------------------------------------------------------
 */

taddClass.prototype.install = function(sessid, callback) {

    // Start the installation
    this.index.install(sessid, callback);
};

// Export the module!
module.exports = taddClass;