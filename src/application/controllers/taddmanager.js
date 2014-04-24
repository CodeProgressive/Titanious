/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * CONTROLLER FILE - taddmanager
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

/*
 |--------------------------------------------------------------------------
 | Constructor
 |--------------------------------------------------------------------------
 */
var taddmanagerController = function(model, view) {
    // Insert the model object into the object
    this.model = model;
    // Insert the view object into the object
    this.view = view;
};

taddmanagerController.prototype.addButtons = function(av) {

    // Get the first in the object
    for (var first in av) {  break; }

    // Influence the taddManager object by adding buttons
    if(typeof av[first] !== 'undefined' &&
        typeof av[first].actions === 'undefined') {

        for(var tadd in av) {

            switch(av[tadd].status.code) {

                case 0:
                    av[tadd].actions = [
                        {
                            action : "install",
                            class : "btn-success",
                            name : "Install",
                            icon : "i-arrow-up"
                        }
                    ];
                    break;
                case 1:
                    av[tadd].actions = [
                        {
                            action : "config",
                            class : "btn-primary",
                            name : "Configure",
                            icon : "i-settings"
                        },
                        {
                            action : "remove",
                            class : "btn-danger",
                            name : "Remove",
                            icon : "i-cross2"
                        }
                    ];
                    break;
                case 2:
                    av[tadd].actions = [
                        {
                            action : "remove",
                            class : "btn-danger",
                            name : "Remove",
                            icon : "i-cross2"
                        }
                    ];
                    break;
                default:

                    break;
            }
        }
    }
};

taddmanagerController.prototype.index = function() {

    // Create a more convenient name
    var av = this.app.taddManager.available;

    // Add the buttons
    this.addButtons(av);

    // Make the dashboard view
    return this.view.make("tm_index.html", {
        tad : {
            available : av
        }
    });
};

taddmanagerController.prototype.install = function(req, res) {

    // INSTALL
    this.app.taddManager.install(req.params.name, req.sessionID, function(err, result){

        if(err) {
            throw new Error(err);
        }

        console.log(result);

        // Else just instal it an show the tadd manager
        return res.redirect("/taddmanager");
    });
};

// Export the module!
module.exports = taddmanagerController;