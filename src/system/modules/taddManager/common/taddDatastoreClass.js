/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * TADD DATASTORE CLASS
 *
 * This class is used to add datastore information to the object
 * generated by the validate class
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

//var paths   = require('../../../includes/paths.js');

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 |
 | Some basic checkups are preformed here to ensure the entire class can
 | preform it's duties.
 |
 */

var taddDatastoreClass = function(app) {

    // Insert the datastore for later use
    this.datastore = app.datastore;
};

/*
 |--------------------------------------------------------------------------
 | Status enumeration
 |--------------------------------------------------------------------------
 */

taddDatastoreClass.STATUS = function(num) {

    var r;

    switch(num) {
        case 0:
            r = "Not installed";
            break;
        case 1:
            r = "Not configured";
            break;
        case 2:
            r = "Installed and ready";
            break;
        default:
            r = "Unknown";
            break;
    }

    return r;
};

/*
 |--------------------------------------------------------------------------
 | Get status
 |--------------------------------------------------------------------------
 |
 | Add status data to the object created by the validate class
 |
 */

taddDatastoreClass.prototype.getStatus = function(taddsValidatedObject, callback) {

    var self = this;

    if(typeof taddsValidatedObject !== 'object') {
        return callback("taddDatastoreClass.getStatus expects parameter 1 to be of type Object, " + typeof taddsValidatedObject + " given.");
    }

    var total = Object.keys(taddsValidatedObject).length,
        count = 0;

    // If the object is filled loop through it
    if(total > 0) {

        for(var tadd in taddsValidatedObject) {

            count ++;

            // Find the tadd in the datastore, if it's not there, it's not installed
            self.datastore.tadd.find({ name : taddsValidatedObject[tadd].name }, this.datastoreCallback(taddsValidatedObject[tadd], callback));

            if(count === total) {
                return callback(null, taddsValidatedObject);
            }
        }
    }
};

/*
 |--------------------------------------------------------------------------
 | Datastore callback
 |--------------------------------------------------------------------------
 |
 | Primarily used from within this class when the datastore returns it's
 | answer
 |
 */

taddDatastoreClass.prototype.datastoreCallback = function(tad, callback) {

    return function(err, docs) {

        if(err) {
            return callback(err);
        }

        if(!Array.isArray(docs) || docs.length <= 0) {
            tad.status = {
                code : 0
            };
        }

        tad.status.text = taddDatastoreClass.STATUS(tad.status.code);
    };
};

// Export the module!
module.exports = taddDatastoreClass;