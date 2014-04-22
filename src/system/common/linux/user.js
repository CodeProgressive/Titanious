/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * LINUX USER COMMAND LINE HELPER
 *
 * A helper file for the use with SU in Linux
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

var clClass = require('./../cl.js'),
    paths = require("./../../includes/paths.js"),
    ssh = require(paths.__static + "ssh_sessions.js");

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 */

var linuxUserlass = function() {
    this.cl = new clClass();
};

/*
 |--------------------------------------------------------------------------
 | Check credentials of Linux user
 |--------------------------------------------------------------------------
 |
 | The callback either returns an error, or it returns a nice object
 | containing all the user data including the groups and id's
 |
 */

linuxUserlass.prototype.checkCredentials = function(sessid, username, password, callback) {

    ssh.setSession(sessid,username,password);
    ssh.connectSession(sessid, function(err){

        if(err) {
            callback(err);
        }

        ssh.exec(sessid, 'id', function(err, result){

            if(err) {
                callback(err);
            }

            var filthyResult = result.toString().split(","),
                firstFilthyResult = filthyResult[0].split(" ");

            filthyResult = filthyResult.splice(1);

            var details = {
                uid : {
                    id : firstFilthyResult[0].substr(4, firstFilthyResult[0].indexOf("(") - 4),
                    name : firstFilthyResult[0].substr(firstFilthyResult[0].indexOf("(") + 1, firstFilthyResult[0].indexOf("(") - 1)
                },
                gid : {
                    id : firstFilthyResult[1].substr(4, firstFilthyResult[1].indexOf("(") - 4),
                    name : firstFilthyResult[1].substr(firstFilthyResult[1].indexOf("(") + 1, firstFilthyResult[1].indexOf("(") - 1)
                },
                groups : [
                    {
                        id : firstFilthyResult[2].substr(7, firstFilthyResult[2].indexOf("(") - 7),
                        name : firstFilthyResult[2].substr(firstFilthyResult[2].indexOf("(") + 1, firstFilthyResult[2].indexOf("(") - 1)
                    }
                ]
            };

            if(filthyResult.length > 0) {

                filthyResult.forEach(function(value){

                    details.groups.push({
                        id : value.substr(0, value.indexOf("(")),
                        name : value.substr(value.indexOf("(") + 1, value.indexOf(")") -2)
                    });
                });
            }

            callback(null, details);
        });
    });
};

// Export the module!
module.exports = linuxUserlass;