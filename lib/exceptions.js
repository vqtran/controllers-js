/* Exception thrown for if HTTP verb is invalid. */
exports.InvalidHttpVerb = function(controller, route, type) {
    throw "ERROR: " + controller + "." + route + " uses an invalid HTTP VERB: " + type;
};

/* Exception thrown for if controller is not found */
exports.ControllerNotFound = function(controller) {
   throw "ERROR: Controller, " + controller + ", not found.";
};

/* Exception thrown for if route is not found */
exports.RouteNotFound = function(controller, route) {
    throw "ERROR: Route handler, '" + route + 
        "' not found in Controller, '" + controller + "'.";
};

/* Exception thrown for if missing params in routing table */
exports.RoutingTableParameters = function(route) {
   throw "ERROR: Route does not have enough parameters.\n" + JSON.stringify(route);
};
