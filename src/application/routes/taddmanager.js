/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * ROUTE FILE - settings route
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

module.exports = {

    "/" : function(model, view, controller) {

        return {
            all : function() {

                return controller.call("taddmanager");
            }
        };
    },

    "/install/:name" : function(model, view, controller) {

        return {
            all : function(req, res) {

                return controller.call("taddmanager@install", [req, res]);
            }
        };
    }
};