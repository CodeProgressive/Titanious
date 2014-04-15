/**
 * Nubyz server TEST
 * Boot file - Facade pattern like file starting everything
 * required for the server to function.
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

'use strict';

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()

 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var appClass = require("../../src/system/app.js");

exports["constructor expects an options object"] = function(test) {

    test.doesNotThrow(function () { new appClass(); });
    test.doesNotThrow(function () { new appClass({}); });
    test.throws(function() { new appClass("Not an object"); });
    test.throws(function() { new appClass(5); });
    test.done();

};

exports["app object methods"] = {

    setUp: function (callback) {
        this.app = new appClass({dev:true});
        callback();
    },
    'register expects a module function': function (test) {
        test.throws(function() { this.app.register(); });
        test.done();
    }
};