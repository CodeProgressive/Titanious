/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * OS (operating system) HELPER
 *
 * A helper file for fetching OS information
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

var os = require('os-utils');

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 */

var osClass = function() {

    this.info = this.getInfo();
};

/*
 |--------------------------------------------------------------------------
 | Get OS details
 |--------------------------------------------------------------------------
 |
 | Fetch the defails of the OS, like name, version and such
 |
 */

osClass.prototype.getInfo = function() {

    return {
        platform : os.platform()
    };
};

// Export the module!
module.exports = osClass;