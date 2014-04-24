/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * USER COMMAND LINE HELPER
 *
 * A helper file for the use with users in an operating system
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

var osClass = require("./os.js"),
    paths = require("./../includes/paths.js");

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 */

var userClass = function() {

    var os = new osClass(),
        userClass = require(paths.__common + os.info.platform.name + paths.ds + "user.js");

    this.user = new userClass();
};

/*
 |--------------------------------------------------------------------------
 | Check credentials of user depending on os
 |--------------------------------------------------------------------------
 |
 | This is just a gate, a 'passthrough' to an os specific function
 |
 */

userClass.prototype.checkCredentials = function(sessid, username, password, callback) {

    return this.user.checkCredentials(sessid, username, password, callback);
};

// Export the module!
module.exports = userClass;