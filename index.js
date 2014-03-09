/*!
 * Controllers.js
 * Copyright(c) 2014 Vinh Tran (vqtran)
 * MIT Licensed
 */

var requireDir = require('require-dir'),
    methods = require('methods'),
    fs = require('fs'),
    Exception = require('./lib/exceptions.js'),
    ROOT = __dirname + "../../..",
    DEFAULT_PATH = ROOT + "/app/controllers";

var app;

/* Controllers.js - Simply adding MVC-style controllers to Express.js
 *
 * For every file in the top level of controllers, attach the all paths
 * and respective handlers found in the controller to the Express app.
*/

function init(_app) {
    app = _app;
    /* Patches Express app to have function to load controllers */
    app.controllers = controllers;
}

/* Exposes init for usage as require("controllers-js")(app) */
module.exports = init;

/* This method is patched onto the Express app
 * When called, loads all controllers and attaches them to the express app. 
 */
function controllers(options) {
    if (options) {
        /* If path is specified override use that instead. */
        if (options['path']) {
            DEFAULT_PATH = ROOT + options['path'];
        }
    }
    /* Require controller files and attach all controllers
     * to the express app */
    controllers = requireDir(DEFAULT_PATH);
    for (var c in controllers) {
        attachController(controllers[c], {controller_name: c});
    }
}

/* Attaches all routes associated with a controller to
 * the express app, like app.get() or app.post()
 */
function attachController(controller, info) {
    for (var route in controller.routes) {
        /* action and path of a route */
        var config = controller.routes[route];
        /* handler function for the route */
        var handler = controller[route];
        /* If the controller has a handler associated with it
         * attach that route/handler to the app */
        if (controller[route]) {
            info['route'] = route;
            attachRoute(config, handler, info);
        }
        else Exception.RouteNotFound(info.controller_name, route);
    }
}

/* Attaches a specific route and its handler to the express app */
function attachRoute(config, handler, info) {
    /* Only if it is a support http verb */
    if (isValidHttpVerb(config.action)) {
        /* attaches to express app*/
        app[config.action](config.path, handler);
    }
    else Exception.InvalidHttpVerb(info.controller_name, info.route, config.action);
}

/* Given a string, returns true if it is a valid HTTP verb, false otherwise */
function isValidHttpVerb(verb) {
    return methods.indexOf(verb) > -1;
}
