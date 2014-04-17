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
    cookieParser    = require('cookie-parser'),
    session         = require('express-session'),
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

    default_action : "index",
    default_route_file : "default",

    session_secret : "kYqJceJ90iEkyVNWZCpIQuUIUS9kma4VU0fOhTcaJ5YW64PwPnYPVAmeOtqZQQ5"
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

    // Create the express app
    this.app = express();

    // Merge the default options with the options set in the config file
    this.options = new OptionsClass(name).merge(default_options);

    // Make sure the port is a number
    if(typeof this.options.connection.port !== 'number') {
        this.options.connection.port = parseInt(this.options.connection.port,10);
    }

    // This is where all the template parse magic happens!
    this.app.engine('html', swig.renderFile);

    // View engine
    this.app.set('view engine', 'html');
    // The view directory
    this.app.set('views', paths.__views);

    // set the static files location /public/img will be /img for users
    this.app.use(express.static(paths.__public));
    // pull information from html in POST
    this.app.use(bodyParser());
    // simulate DELETE and PUT
    this.app.use(methodOverride());
    // use cookies
    this.app.use(cookieParser());
    // use sessions
    this.app.use(session({ secret: this.options.session_secret, key: 'sid', cookie: { secure: true }}));

    this.app.use(this.init(this));

    if(app.options.dev) {
        // log every request to the console
        this.app.use(morgan('dev'));
        // Disable caching by express:
        this.app.set('view cache', false);
        // Disable swig caching
        swig.setDefaults({ cache: false });
    }

    this.app.listen(this.options.connection.port);

    app.log.info("Express : Sucessfully booted and listening on port: " + this.options.connection.port);
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
expressClass.prototype.init = function(self) {

    return function(req,res,next) {

        var model = new modelClass(),
            view = new viewClass(res),
            controller = new controllerClass(self.options, model, view),
            router = new routerClass(model, view, controller);

        router.getRouter(self, function(err){

            if(err) {
                throw new Error(err);
            }

            next();
        });
    };
};

// Export the module!
module.exports = expressClass;