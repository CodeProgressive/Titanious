/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * SSH SESSIONS SINGLETON FILE
 *
 * This data file contains all SSH sessions of various users
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

var ssh         = require('ssh2'),
    formClass   = require("../common/form.js");

module.exports = (function(){

    var self = {},
        session_list = {},
        form = new formClass();

    var destroySession = function(sessid) {

        delete session_list[sessid];
    };

    self.getSessionList = function() {

        return session_list;
    };

    self.sessionExists = function(sessid) {

        return (typeof session_list[sessid] !== 'undefined');
    };

    self.setSession = function(sessid, username, password) {

        session_list[sessid] = {
            connection : new ssh(),
            options : {
                host : 'localhost',
                port : 22,
                username : username,
                password : password
            }
        };

        session_list[sessid].connection.on('end', function() {
            destroySession(sessid);
        });
        session_list[sessid].connection.on('close', function() {
            destroySession(sessid);
        });
    };

    self.exec = function(sessid, command, callback) {

        var errList = [],
            list = [];

        session_list[sessid].connection.exec(command, function(err, stream) {

            if(err) {
                callback(err);
            }

            stream.on('data', function(data, extended) {

                if(extended === 'stderr') {

                    errList.push(data);

                } else {

                    list.push(data);
                }
            });
            stream.on('end', function() {

                if(errList.length > 0) {
                    return callback(errList.join().toString().split('\n').filter(
                        function(n){
                            return (typeof n !== 'undefined' && form.removeWhiteSpace(n).length > 0);
                        }).map(function(i){
                            return ((i.charAt(0) === ',')? i.substr(1):i);
                        }));
                }

                if(list.length > 0) {
                    return callback(null, list.join().toString().split('\n').filter(
                        function(n){
                            return (typeof n !== 'undefined' && form.removeWhiteSpace(n).length > 0);
                        }).map(function(i){
                            return ((i.charAt(0) === ',')? i.substr(1):i);
                        }));
                }
            });
            stream.on('close', function() {

                // TODO : Nice close session
            });
            stream.on('exit', function() {

                // TODO : Throw something for code and signal parameters
            });
        });
    };

    self.connectSession = function(sessid, callback) {

        if(!self.sessionExists(sessid)) {
            callback("SSH Session is not yet created, use setSession to create it.");
        }

        // Connect now
        session_list[sessid].connection.connect(session_list[sessid].options);

        // Send error if there is one
        session_list[sessid].connection.on('error', function(err){
            callback(err);
        });

        // When connected, let themknow!
        session_list[sessid].connection.on('ready', function(){

            callback(null, session_list[sessid].connection);
        });
    };

    return self;

})();