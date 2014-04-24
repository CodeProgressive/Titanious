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

var os = require('os');

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

    var freeMem = os.freemem().toString(),
        processUptime = process.uptime().toString();

    var ro = {
        platform : {
            name : os.platform(),
            release : os.release()
        },
        hostname : os.hostname(),
        architecture : os.arch(),
        process : {
            uptime: {
                short : processUptime.substr(0, processUptime.length - 13),
                long : processUptime
            }
        },
        memory : {
            total : os.totalmem(),
            free : {
                amount : freeMem,
                percentage : {
                    short : freeMem.substr(0, freeMem.indexOf(".") + 3),
                    long : freeMem
                }
            }
        },
        harddrive : {

        },
        cpus : os.cpus(),
        network : os.networkInterfaces(),
        system : {
            uptime : os.release()
        }
    };

    return ro;
};

// Export the module!
module.exports = osClass;