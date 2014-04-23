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

var fs              = require('fs'),
    viewBagClass    = require('../lib/viewBagClass.js'),
    paths           = require('../../../includes/paths.js');

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
 | Set viewBag
 |--------------------------------------------------------------------------
 */

viewClass.prototype.setViewBag = function(acceptedLanguages, callback) {

    // We need 'this' inside the callback
    var self = this;

    // Insert the res express object to the view object
    this.viewBag = new viewBagClass(acceptedLanguages);
    // Add the default locale folder
    this.viewBag.addFolder(paths.__locale, function(err){

        if(err) {
            callback(err);
        }

        // Add the general language locale folder
        self.viewBag.addLocaleFolder(paths.__locale, function(err){

            if(err) {
                callback(err);
            }

            // Now execute the callback
            callback(null, self.viewBag);
        });
    });
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

    // Merge the inserted viewBag last
    this.viewBag.merge(viewBag);

    // Check if the controller file exists
    fs.exists(paths.__views + filePath, function(exists){

        // If the file doesn't exist, let the callback know and stop everything
        if(!exists) {
            throw new Error("View file: " + filePath + ".js could not be found in directory: " + paths.__views);
        }

        // Render the application through swig
        self.response.render(filePath, self.viewBag.viewBag || viewBag || {}, function(err , html){

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