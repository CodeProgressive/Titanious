/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * VIEW CLASS FILE
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

/*
 |--------------------------------------------------------------------------
 | Required modules
 |--------------------------------------------------------------------------
 */

var fs      = require('fs'),
    paths   = require('../../../includes/paths.js');

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 */

var viewClass = function() {};

/*
 |--------------------------------------------------------------------------
 | Set response
 |--------------------------------------------------------------------------
 */

viewClass.prototype.setResponse = function(response) {

    // Insert the res express object to the view object
    this.response = response;
};

/*
 |--------------------------------------------------------------------------
 | Make the view
 |--------------------------------------------------------------------------
 |
 | Return the view to the client after processing it
 |
 */
viewClass.prototype.make = function(filePath, viewBag) {

    // We need 'this' inside the callback
    var self = this;

    // Check if the controller file exists
    fs.exists(paths.__views + filePath, function(exists){

        // If the file doesn't exist, let the callback know and stop everything
        if(!exists) {
            throw new Error("View file: " + filePath + ".js could not be found in directory: " + paths.__views);
        }

        // Render the application through swig
        self.response.render(filePath, viewBag || {}, function(err , html){

            if(err) {
                throw new Error(err);
            }

            // Now send the processed html
            return self.response.send(html);
        });
    });
};

// Export the module!
module.exports = viewClass;