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

taddmanagerController.prototype.index = function() {

    // Make the dashboard view
    return this.view.make("tm_index.html", {
        tad : {
            available : this.app.taddManager.available
        }
    });
};

// Export the module!
module.exports = taddmanagerController;