/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * TADD QUEUE CLASS
 *
 * The queue used for installation and configuration of tadds
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

var paths   = require('../../../includes/paths.js'),
    os      = require(paths.__common + "os.js");

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 */

var taddQueueClass = function(datastore) {

    // Insert the datastore
    this.datastore = datastore;
    // Boolean to make sure it's running... or not
    this.running = false;
    // Create the queue
    this.queue = {};
};

/*
 |--------------------------------------------------------------------------
 | Start queue
 |--------------------------------------------------------------------------
 */

taddQueueClass.prototype.start = function() {

    if(!this.running) {

        if(Object.keys(this.queue).length > 0) {

            // Get the first in the object
            for(var fo in this.queue) { break; }

            // And the first in the queue
            for(var fq in this.queue[fo].queue) { break; }

            // Install now
            this.queue[fo].queue[fq].controller[fq](new os(), this.done(fo, fq, this.queue[fo].queue[fq].callback));

            this.running = true;
        }
    }
};

/*
 |--------------------------------------------------------------------------
 | Add tadd installation or configuration to queue
 |--------------------------------------------------------------------------
 */

taddQueueClass.prototype.addToQueue = function(tadd, action) {

    // Add the object
    if(typeof this.queue[tadd.mname] !== 'object') {

        this.queue[tadd.mname] = {
            name : tadd.name,
            queue : {}
        };
    }

    // Add it to the queue inside the object
    this.queue[tadd.mname].queue[action.action] = {
        controller : action.controller,
        callback : action.callback
    };

    // Now start
    this.start();
};

/*
 |--------------------------------------------------------------------------
 | The function for the installation to set itself as done
 |--------------------------------------------------------------------------
 */

taddQueueClass.prototype.done = function(name, action, callback) {

    // Add this to self
    var self = this;

    return function(err) {

        // It's not running anymore
        self.running = false;

        if(err) {
            return callback(err);
        }

        // Delete it from the queue
        delete self.queue[name].queue[action];

        // Check if it's done
        if(Object.keys(self.queue[name].queue).length <= 0) {
            // Remove the first from queue
            delete self.queue[name];
        }

        // Start the queue actions again
        self.start();

        // Everything went a-okay, so execute the callback nicely
        return callback();

    };
};

/*
 |--------------------------------------------------------------------------
 | Add tadd installation or configuration to queue
 |--------------------------------------------------------------------------
 */

taddQueueClass.prototype.getQueue = function() {

    return this.queue;
};

// Export the module!
module.exports = taddQueueClass;