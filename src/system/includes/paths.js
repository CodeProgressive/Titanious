/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * TITANIOUS PATH SPECIFICATIONS
 *
 * The paths to most of the entire application can be set here
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

"use strict";

var path = require("path");

/*
 |--------------------------------------------------------------------------
 | Paths object
 |--------------------------------------------------------------------------
 |
 | Set the paths relative to the root here
 |
 */
var paths = {

    // General
    "application" : "application",
    "log" : "log",
    "config" : "config",
    "system" : "system",

    // System
    "common" : "system" + path.sep + "common",
    "modules" : "system" + path.sep + "modules",
    "data" : "system" + path.sep + "data",
    "includes" : "system" + path.sep + "includes",

    // Application
    "controllers" : "application" + path.sep + "controllers",
    "models" : "application" + path.sep + "models",
    "public" : "application" + path.sep + "public",
    "views" : "application" + path.sep + "views",
    "routes" : "application" + path.sep + "routes"
};

/*
 |--------------------------------------------------------------------------
 | Directory Separator
 |--------------------------------------------------------------------------
 |
 | Maybe, someday we would like Windows users to use Titanious as well!
 | So let's make sure every slash is forward of backward according to the
 | operating system!
 |
 */
paths.ds = path.sep;

/*
 |--------------------------------------------------------------------------
 | Root calculation
 |--------------------------------------------------------------------------
 |
 | The depth variable set below will traverse up the directory tree for
 | as many times as the depth is set to make sure we have the correct
 | root path.
 |
 */

var depth = 2;
// The calculated root
var root = (function(d){ var r = __dirname; for(d;d>0;d--){r = path.dirname(r);} return r; })(depth);

/*
 |--------------------------------------------------------------------------
 | Add a "magic get method"
 |--------------------------------------------------------------------------
 |
 | The system can easily include the root path by adding __ in front of the
 | path it's requesting. Such a convenience!
 |
 */

for(var key in paths) {
    // Add a trailing slash
    if(paths[key][paths[key].length - 1] !== paths.ds) {
        paths[key] = paths[key] + paths.ds;
    }
    // Add the double underscore for root usage
    paths["__" + key] = root + paths.ds + paths[key];
}

// Now set the root inside the paths object as well
paths.root = root + paths.ds;

module.exports = paths;