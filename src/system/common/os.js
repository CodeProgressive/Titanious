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

    var freeMem = os.freememPercentage().toString(),
        processUptime = os.processUptime().toString();

    var ro = {
        platform : os.platform(),
        process : {
            uptime: {
                short : processUptime.substr(0, processUptime.length - 13),
                long : processUptime
            }
        },
        memory : {
            total : os.totalmem(),
            free : {
                amount : os.freemem(),
                percentage : {
                    short : freeMem.substr(0, freeMem.indexOf(".") + 3),
                    long : freeMem
                }
            }
        },
        harddrive : {

        },
        cpu : {
            total : os.cpuCount()
        },
        system : {
            uptime : os.sysUptime()
        }
    };

    return ro;
};

// Export the module!
module.exports = osClass;