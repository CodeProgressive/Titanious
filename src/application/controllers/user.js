/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * CONTROLLER FILE - user
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

var paths       = require("../../system/includes/paths.js"),
    formClass   = require(paths.__common + "form.js"),
    userClass   = require(paths.__common + "user.js");

/*
 |--------------------------------------------------------------------------
 | Constructor
 |--------------------------------------------------------------------------
 */
var userController = function(model, view) {
    // Insert the model object into the object
    this.model = model;
    // Insert the view object into the object
    this.view = view;
};

userController.prototype.login = function(body, req, res) {

    // View object to filled or not to be filled...
    var o = { error : false },
        self = this,
        form = new formClass(),
        user = new userClass();

    // Something was posted, check it
    if(body) {

        var err = form.checkForError({
            username : {
                type : "text",
                content : body.username,
                required : true
            },
            password : {
                type : "text",
                content : body.password,
                required : true
            }
        });

        if(err) {

            o = { error : "I didn't seem to hear you well enough?" , fields : err };

        } else {

            return user.checkCredentials(req.sessionID, body.username, body.password, function(err, result){

                if(err || !result) {
                    o = { error : "Username or password incorrect." };
                    return self.view.make("signin.html", o);
                }

                req.session.regenerate(function(err){

                    if(err) {
                        throw new Error(err);
                    }

                    // Set the session
                    req.session.user = {
                        username: body.username,
                        details: result
                    };

                    // Check the history
                    if(req.session.history) {
                        return res.redirect(req.session.history);
                    }
                    return res.redirect("/dashboard");
                });
            });
        }
    }

    // Make the login view
    return self.view.make("signin.html", o);
};

userController.prototype.logout = function(req, res) {

    req.session.destroy(function(err){
        return res.redirect("/dashboard");
    });
};

// Export the module!
module.exports = userController;