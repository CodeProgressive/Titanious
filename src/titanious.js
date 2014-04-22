/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * MAIN INDEX FILE
 *
 * This is the main entry point to the Titanious system
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

/*
 |--------------------------------------------------------------------------
 | Root access cap
 |--------------------------------------------------------------------------
 |
 | Make sure we deny root access by logging into our created Titanious
 | user. This user will have limited access to do only the absolute
 | necessary functions.
 |
 */

try {

    // Set the group id
    process.setgid('titanious');
    // Set the user id
    process.setuid('titanious');

} catch(e) {

    console.log("Titanious must run as root.");
    process.exit(1);
}

/*
 |--------------------------------------------------------------------------
 | Default application options
 |--------------------------------------------------------------------------
 |
 | Create a global options object to be inserted into every app
 | library. Do not change the default values here, this can be done
 | by ysing process arguments or via config files!
 |
 */
var options = {
    dev : false,
    verbose : false
};

/*
 |--------------------------------------------------------------------------
 | Process arguments
 |--------------------------------------------------------------------------
 |
 | Set the process arguments and get the arguments involving the boot
 | up process.
 |
 */
// Check if there are process arguments used
if(typeof process.argv === 'object' && process.argv.length > 0) {

    // Iterate through all arguments
    process.argv.forEach(function(val){

        switch(val){
            case "dev": case "-dev": case "--dev":
                options.dev = true; break;
            case "node":case __filename.replace(".js", ""):
                // Do nothing, it's okay...
                break;
            default:
                // Unknown option! Stop everything!
                process.exit(1); break;
        }
    });
}

/*
 |--------------------------------------------------------------------------
 | Get the paths
 |--------------------------------------------------------------------------
 |
 | The paths module returns a direct object containing all path information
 |
 */

var paths = require("./system/includes/paths.js");

/*
 |--------------------------------------------------------------------------
 | The famous app object
 |--------------------------------------------------------------------------
 |
 | Avoid a God Object anti-pattern but keep the app object containing
 | all system module information.
 |
 | Abstraction:
 | The app object contains the objects named the same as the folders
 | inside the system folder. So to know what's inside the app
 | object... just look inside the system folder!
 |
 */

var appClass = require(paths.__system + "app.js"),
    app = new appClass(options);

/*
 |--------------------------------------------------------------------------
 | Enable loggin through CP-logger
 |--------------------------------------------------------------------------
 |
 | Use the codeProgressive logger module for the logging of the entire
 | application. Because it's used almost everywhere, we include it into the
 | app object.
 |
 */

app.log = require( 'cp-logger' ).init( 3 , {

    saveToFile : true,
    filePath : paths.__log + "application.log"

} );

/*
 |--------------------------------------------------------------------------
 | Register app modules
 |--------------------------------------------------------------------------
 |
 | Register the modules used in the app object for proper booting.
 |
 | The first parameter requires a require to the module index
 |     e.g. require('./system/express')
 |
 | The second parameter is optional and may contain options which are
 | put through to the constructor of the modules.exports.boot object.
 | This parameters needs to be in the form of an object.
 |
 */

try {

    app.register(
        require(paths.__modules + "express"),
        { port : 80 }
    );

    app.register(
        require(paths.__modules + "taddManager")
    );



} catch(err) {

    console.log(err);
}

/*
 |--------------------------------------------------------------------------
 | Start booting
 |--------------------------------------------------------------------------
 |
 |  The magical boot process will now begin
 |
 */

app.boot();