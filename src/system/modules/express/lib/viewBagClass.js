/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * VIEWBAG GENERATION CLASS
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 */

var viewBagClass = function() {

    // Create the viewbag variable used throughout the class
    this.viewBag = {};
};

/*
 |--------------------------------------------------------------------------
 | AddFolder
 |--------------------------------------------------------------------------
 |
 | Add an entire folder of viewBag files. All exported objects inside this
 | folder will be merged with the current viewBag and being given privilege
 | over the items already in there.
 |
 */
viewBagClass.prototype.addFolder = function(path) {

    // Use require all to require all files
    var files = require("require-all")(path);
    // Now loop through and add to the viewBag
    for(var x in files) {
        console.log(x);
    }
};

/*
 |--------------------------------------------------------------------------
 | AddLocale
 |--------------------------------------------------------------------------
 |
 | Expects a path to a folder containing multiple folders with language
 | codes in it (e.g. en-US) and picks the preferred language. It also
 | merges with the default language when the variable does exist in the
 | default language and not in the preferred language.
 |
 */
viewBagClass.prototype.addLocaleFolder = function(path) {

    console.log(path);
};

/*
 |--------------------------------------------------------------------------
 | Merge
 |--------------------------------------------------------------------------
 |
 | Merge the input array with the viewBag of this object. The inserted
 | viewBag has privilege over the viewBag already in this object.
 |
 */
viewBagClass.prototype.merge = function(viewBag) {

    var h = {},
        n = [];

    viewBag.concat(this.viewBag).map(function(b){
        h[b] = h[b] || n.push(b);
    });

    return n;
};

/*
 |--------------------------------------------------------------------------
 | Set
 |--------------------------------------------------------------------------
 |
 | Set variable(s) in the viewBag to be merged later with a viewBag
 | specific to a template or controller.
 |
 | The first parameter can either be an object (containing multiple keys)
 | or a key name.
 |
 | The second parameter can only be a value which will be linked to the
 | key name of the first parameter inside the viewBag.
 |
 */
viewBagClass.prototype.set = function(input, variable) {

    // If the first parameter is an object, then import it as such!
    if(typeof input === 'object') {
        for(var key in input) {
            this.viewBag[key] = input[key];
        }
    }

    // If the second parameter is set, then we are dealing with a key value pair
    if(typeof variable === 'string') {

        if(typeof input !== 'string') {
            throw new Error("viewBagClass.set expects the first parameter to be a string when the second parameter is set, " + typeof input + " given.");
        }

        // Set the variable accordingly
        this.viewBag[input] = variable;
    }
};

// Export the module!
module.exports = viewBagClass;