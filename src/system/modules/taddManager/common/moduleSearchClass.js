/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * NODE MODULE SEARCH CLASS
 *
 * This is an extension to the TADD Manager class.
 * It is used to find node_modules.
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

var paths   = require('../../../includes/paths.js'),
    fs      = require("fs"),
    clClass = require(paths.__common + "cl.js");

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 |
 | Some basic checkups are preformed here to ensure the entire class can
 | preform it's duties.
 |
 */

var moduleSearchClass = function() {

    // TODO : Validations

    // Initialize the command line class
    this.cl = new clClass();
};

/*
 |--------------------------------------------------------------------------
 | Search for node modules
 |--------------------------------------------------------------------------
 |
 | This method will search through all installed node_modules, inside the
 | Titanious folder and globally
 |
 */

// All
moduleSearchClass.prototype.search = function(callback) {

    var self = this;

    // First local then global,
    return self.localSearch(function(err, array){

        if(err) {
            return callback(err);
        }

        self.globalSearch(function(err, globArray){

            if(err) {
                return callback(err);
            }

            return callback(null, array.concat(globArray));
        });
    });
};

// Locally
moduleSearchClass.prototype.localSearch = function(callback) {

    var self = this;

    if(typeof module.paths !== "object") {
        callback("Module.paths error: The module.paths variable is not set correctly");
    }

    var directories = [];

    // Scan each module.paths path locally
    module.paths.forEach(function(d)
    {
        directories = directories.concat(self.getDirectoriesSync(d));
    });

    callback(null, directories);
};

// Globally
moduleSearchClass.prototype.globalSearch = function(callback) {

    var self = this;

    this.cl.bufferExec('npm config get prefix', function(err, stdout){

        if (err) {
            callback(err, null);
        }

        var global_path =
            ((typeof stdout === 'object') ? stdout[0] : stdout ) + paths.ds + ((!/^win/.test(process.platform)) ? "lib" + paths.ds : "" ) + "node_modules";

        callback(null, self.getDirectoriesSync(global_path));

    });
};

// Check directories and return valid results
moduleSearchClass.prototype.getDirectoriesSync = function(dir) {

    var directories = [];

    // If the directory exists
    if(fs.existsSync(dir)) {

        // Check inside the directory
        var id = fs.readdirSync(dir);

        if(typeof id === "object" && id.length > 0) {

            id.forEach(function(idn){

                directories.push(dir + paths.ds + idn);
            });
        }
    }

    return directories;
};

// Export the module!
module.exports = moduleSearchClass;