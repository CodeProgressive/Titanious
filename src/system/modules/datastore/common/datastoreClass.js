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
var datastoreClass = function(name) {

    // Merge the default options with the options set in the config file
    this.options = new OptionsClass(name).merge(default_options);
};

/*
 |--------------------------------------------------------------------------
 | The initialisation of Datastore
 |--------------------------------------------------------------------------
 */
datastoreClass.prototype.init = function(callback) {

    callback(null);
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
datastoreClass.prototype.destroy = function() {


};

// Export the module!
module.exports = datastoreClass;