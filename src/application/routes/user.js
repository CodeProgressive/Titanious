/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * ROUTE FILE - user routes
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

module.exports = {

    "/" : function() {

        return {
            all : function(req, res) {

                res.end("Main user route");
            }
        };
    },

    "/login" : function() {

        return {
            all : function(req, res) {

                res.end("User login route");
            }
        };
    }
};