/**
 *
 *    _____ ___ _____  _    _   _ ___ ___  _   _ ____
 *   |_   _|_ _|_   _|/ \  | \ | |_ _/ _ \| | | / ___|
 *     | |  | |  | | / _ \ |  \| || | | | | | | \___ \
 *     | |  | |  | |/ ___ \| |\  || | |_| | |_| |___) |
 *     |_| |___| |_/_/   \_|_| \_|___\___/ \___/|____/
 *
 *
 * EXPRESS OBJECT FILE
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

var express         = require('express'),
    swig            = require('swig'),
    morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    paths           = require('../../../includes/paths.js'),

    routerClass     = require(__dirname + paths.ds + "routerClass"),
    modelClass      = require(__dirname + paths.ds + "modelClass"),
    viewClass       = require(__dirname + paths.ds + "viewClass"),
    controllerClass = require(__dirname + paths.ds + "controllerClass"),

    OptionsClass    = require(paths.__common + "options.js");

/*
 |--------------------------------------------------------------------------
 | Default options object
 |--------------------------------------------------------------------------
 |
 | This object will be used to create a new config file when one doesn't
 | exist already inside the root/config folder. It will also be
 | used to define the default values of these options.
 |
 */

var default_options = {

    connection : {
        host : "127.0.0.1",
        port : 3333
    },

    default_route_file : "default"
};

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 |
 | Instantiate some variables and use the options object to merge the
 | default options above with options inside the configuration file with
 | the same name as the module
 |
 */
var expressClass = function(name, app) {

    // Extend the express class to this one
    var self = this;
    // Create the express app
    self.app = express();

    // This is where all the magic happens!
    self.app.engine('html', swig.renderFile);

    // View engine
    self.app.set('view engine', 'html');
    // The view directory
    self.app.set('views', paths.__views);

    // set the static files location /public/img will be /img for users
    self.app.use(express.static(paths.__public));
    // pull information from html in POST
    self.app.use(bodyParser());
    // simulate DELETE and PUT
    self.app.use(methodOverride());

    // Merge the default options with the options set in the config file
    self.options = new OptionsClass(name).merge(default_options);

    // Make sure the port is a number
    if(typeof self.options.connection.port !== 'number') {
        self.options.connection.port = parseInt(self.options.connection.port,10);
    }

    this.init(self, function(){

        if(app.options.dev) {
            // log every request to the console
            self.app.use(morgan('dev'));
            // Disable caching by express:
            self.app.set('view cache', false);
            // Disable swig caching
            swig.setDefaults({ cache: false });
        }

        self.app.listen(self.options.connection.port);

        app.log.info("Express : Sucessfully booted and listening on port: " + self.options.connection.port);
    });
};

/*
 |--------------------------------------------------------------------------
 | Initialize everything
 |--------------------------------------------------------------------------
 |
 | Create the router and insert the controller model and view for use
 | within the different routes
 |
 */
expressClass.prototype.init = function(self, callback) {

    var model = new modelClass(),
        view = new viewClass(),
        controller = new controllerClass(),
        router = new routerClass(model, view, controller);

    router.getRouter(self, function(err){

        if(err) {
            callback(err);
        }

        callback(null);
    });
};

// Export the module!
module.exports = expressClass;