/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * EXPRESS OBJECT FILE
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

var express        = require('express'),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    paths          = require('../../../includes/paths.js'),
    OptionsClass   = require(paths.__common + "options.js");

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
var expressClass = function(name) {

    // Extend the express class to this one
    var app = express();

    // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public'));
    // log every request to the console
    app.use(morgan('dev'));
    // pull information from html in POST
    app.use(bodyParser());
    // simulate DELETE and PUT
    app.use(methodOverride());

    // Merge the default options with the options set in the config file
    this.options = new OptionsClass(name).merge(default_options);
};

// Export the module!
module.exports = expressClass;