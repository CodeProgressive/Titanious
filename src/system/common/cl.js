/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * COMMAND LINE HELPER FILE
 *
 * A helper file to ensure command line functions are
 * executed correctly.
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

var cp  = require('child_process');

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 |
 | Because...
 |
 */

var clClass = function() {};

/*
 |--------------------------------------------------------------------------
 | bufferExec, Exec done the right way (with buffers)
 |--------------------------------------------------------------------------
 |
 | We need a way to use exec and automatically buffer everything that the
 | stdout outputs. We don't want to raise the maxBufferSize and want a
 | neat and clean solution. Well, here it is...
 |
 */

clClass.prototype.bufferExec = function(command, callback) {

    var e = cp.exec(command),
        list = [];

    e.stdout.setEncoding('utf8');

    e.stdout.on('error', function(err){
        callback(err);
    });

    e.stdout.on('data', function (chunk) {
        list.push(chunk);
    });

    e.stdout.on('end', function () {
        callback(null, list.join().toString().split('\n'));
    });
};

// Export the module!
module.exports = clClass;