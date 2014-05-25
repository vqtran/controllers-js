/*!
 * Controllers.js
 * Copyright(c) 2014 Vinh Tran (vqtran)
 * MIT Licensed
 */

var express = require('express'),
    requireDir = require('require-dir'),
    methods = require('methods'),
    fs = require('fs'),
    Exception = require('./lib/exceptions.js'),
    ROOT = require('path').dirname(require.main.filename),
    DEFAULT_PATH = ROOT + "/app/controllers";

/* Controllers.js - Simply adding MVC-style controllers to Express.js
 *
 * For every file in the top level of controllers, attach the all paths
 * and respective handlers found in the controller to an instance of an
 * Express.Router to be used as middleware.
*/

var router;

/* Exposes constructor to initalize the Router object */
module.exports = function(options) {
    /* Check if old user from version 0. */
    if (options && options.set)
       throw "Controllers-js has changed, please read the version 1.x documentation.";
    router = express.Router();
    buildRouter(options);
    return router;
}

/* This method attaches all the controllers to the internal router */
function buildRouter(options) {
    var controllers, table;
    /* Handle options */
    if (options) {
        if (options.path)
            DEFAULT_PATH = ROOT + options.path;
        if (options.table)
            table = require(options.table);
    }
    /* Load controllers data */
    controllers = requireDir(DEFAULT_PATH);
    /* If routing table is provided, load based on the order defined */
    if (table)
        tableLoad(controllers, table);
    /* Otherwise, simple load (alphabetic) */
    else defaultLoad(controllers);
}

/* Routing table ordered load and attachment of the controllers */
function tableLoad(controllers, table) {
    table.forEach(function(route) {
        /* Check for correct number of params */
        if (route.length != 4)
            Exception.RoutingTableParameters(route);
        /* Parse the route parameters */
        var verb = route[0].toLowerCase();
        var path = route[1];
        var controllerName = route[2];
        var controllerFunction = route[3];
        /* Check for errors and attach route */
        if (isValidHttpVerb(verb)) {
            if (!controllers[controllerName])
               Exception.ControllerNotFound(controllerName);
            if (!controllers[controllerName][controllerFunction])
               Exception.RouteNotFound(controllerName, controllerFunction);
            var handler = controllers[controllerName][controllerFunction];
            router[verb](path, handler);
        }
        else Exception.InvalidHttpVerb(controllerName, controllerFunction, verb);
    });
}

/* Default-order load and attachment of the controllers */
function defaultLoad(controllers) {
    for (var c in controllers) {
        attachController(controllers[c], {controller_name: c});
    }
}

/* Attaches all routes associated with a controller to
 * the router, like router.get() or router.post()
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
            info.route = route;
            attachRoute(config, handler, info);
        }
        else Exception.RouteNotFound(info.controller_name, route);
    }
}

/* Attaches a specific route and its handler to the router*/
function attachRoute(config, handler, info) {
    /* Only if it is a support http verb */
    if (isValidHttpVerb(config.action)) {
        /* attaches to the router*/
        router[config.action.toLowerCase()](config.path, handler);
    }
    else Exception.InvalidHttpVerb(info.controller_name, info.route, config.action);
}

/* Given a string, returns true if it is a valid HTTP verb, false otherwise */
function isValidHttpVerb(verb) {
    return methods.indexOf(verb) > -1;
}
