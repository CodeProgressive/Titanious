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

var osClass     = require("./os.js"),
    formClass   = require("./form.js");


/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 */

var clClass = function() {
    this.os = new osClass();
    this.form = new formClass();
};

/*
 |--------------------------------------------------------------------------
 | stdinCommand, Exec done the right way (with buffers)
 |--------------------------------------------------------------------------
 |
 | We need a way to use exec and automatically buffer everything that the
 | stdout outputs. We don't want to raise the maxBufferSize and want a
 | neat and clean solution. Well, here it is...
 |
 */

clClass.prototype.stdinCommand = function(command, callback) {

    var self = this,
        terminal = require('child_process').spawn(((self.os.platform === 'windows')?'cmd':'bash')),
        err = [],
        list = [];

    terminal.stdout.on('data', function (chunk) {
        // Binary buffer returned, decode it
        list.push(new Buffer(chunk, "base64").toString());
    });

    terminal.stderr.on('data', function (data) {
        // Binary buffer returned, decode it
        err.push(new Buffer(data, "base64").toString());
    });

    terminal.stderr.on('end', function () {

        if(err.length > 0) {
            return callback(err.join().toString().split('\n').filter(
                function(n){
                    return (typeof n !== 'undefined' && self.form.removeWhiteSpace(n).length > 0);
                }).map(function(i){
                    return ((i.charAt(0) === ',')? i.substr(1):i);
                }));
        }

        if(list.length > 0) {
            return callback(null, list.join().toString().split('\n').filter(
                function(n){
                    return (typeof n !== 'undefined' && self.form.removeWhiteSpace(n).length > 0);
                }).map(function(i){
                    return ((i.charAt(0) === ',')? i.substr(1):i);
                }));
        }
    });


    terminal.on('exit', function () {

        //TODO : Nice exit code here... use parameters code, signal (which are removed to pass the grunt test)
    });

    terminal.stdin.write(command);
    terminal.stdin.end();
};

// Export the module!
module.exports = clClass;