
/* Exception thrown for if HTTP verb is invalid. */
exports.InvalidHttpVerb = function(controller, route, type) {
    throw "ERROR: " + controller + "." + route + " uses an invalid HTTP VERB: " + type;
}

/* Exception thrown for if route is not found */
exports.RouteNotFound = function(controller, route) {
    throw "ERROR: Route handler, '" + route + 
        "' not found in Controller, '" + controller + "'.";
}
