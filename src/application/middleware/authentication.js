/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * MIDDLEWARE FILE - authentication
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

module.exports = [

    function(req, res, next) {

        // Make sure we are logged in, otherwise no access to anything!
        if(req.url !== "/user/login" && req.url !== "/favicon.ico" && !req.session.user) {
            // Set history
            req.session.history = req.url;
            // Redirect to the login
            return res.redirect("/user/login");
        }

        next();
    }
];