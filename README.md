controllers-js
==============
Simply adding MVC-style controllers to Express.js.

*For any old users, please notice the update and please migrate to the current version.*

## Install
```
$ npm install controllers-js
```
or add it to your `package.json` and 
```
$ npm install
```
## Usage
It's really this simple:

Directory Layout:
```
project
  |- server.js
  |- app
     |- controllers
         |- index.js
         |- other_controllers.js
```
server.js:
```
var express = require('express');
var app = express();
var controllers = require('controllers-js')();

// Some middleware
// ...
app.use(controllers);

// more middleware...

var port = process.env.PORT || 8080;
app.listen(port);
```
index.js:
```
var index = exports = module.exports = {};

index.routes = {
    get: { action: 'get', path: '/' },
    query: { action: 'get', path: '/:message' }
};

index.get = function(req, res) {
    // And are written in usual Express convention
    res.send("Hello world!");
}

index.query = function(req,res) {
    var message = req.params['message'];
    res.send(message);
}
```
Your Express app will now have Index's routes/handlers!
`localhost:8080/` will say "Hello World!" and `localhost:8080/hi` will say "hi".

Add any number of routes, or controllers as you'd like, they'll all be automatically attached to your Express app.

## Routing Table
As your application grows in complexity it may be wise to declare routes in a routing table instead to ensure the correct ordering of your handlers. We can do this as following,
```
var express = require('express');
var app = express();
var Controllers = require('controllers-js');

var controllers = Controllers({table: __dirname + "/routes.json"});

app.use(controllers);

var port = process.env.PORT || 8080;
app.listen(port);
```
routes.json
```
[
   ["GET", "/", "index", "get"],
   ["GET", "/:message", "index", "query"]
]
```
A routing table here is simply a array of arrays (routes) where the first entry is the HTTP verb, the second is the path (as before), the third is the controller name, and the fourth is the handler name in the controller.

Your controllers/routes now will load in the order that you define, and you no longer need to define a routes object in the individual controllers.

## Documentation

####`var Controllers = require("controllers-js")`
Calling this returns a function to initialize the router for the controllers.

####`var controllers = Controllers(option)`
This function returns an Express.Router object with all the correct routes/controllers attached to be used as middleware. By default this will look for controller files in the root level of `app/controllers`. If `option.path` is specified, it will look in this directory instead. 

If `option.table` is defined, it will use the routing table at that path. Details of using a routing table is explained above, and also available in the examples.

Of course you can also use the short-hand,
```
var controllers = require("controllers-js")(options);
app.use(controllers);
```

### Controllers
A controller exports `routes` (unless a routing table is used) and each route handler.
#### `export.routes`
The routes object is a map of handler names to routes, where each route
contains an http action, corresponding to Express' `app.VERB` method, and a path to serve this handler by, also corresponding to Express' convention when used with `app.VERB`.
```
export.routes = {
    handler_name1: { action: "get|post|other http verb", path: "/path/toRoute" },
    ...
}
```
#### `export.<handler_name>`
For each entry in the routes object, the controller _must_ also export a handler for that route.
This handler is the same as Express' usual convention:
```
export.<handler_name> = function(req, res) {
    ...
}
```
For nice-ness putting this at the top,
```
var handler_name = exports = module.exports = {};
```
This will provide a nice way of declaring exported functions/objects by appending it onto this `handler_name` object, instead of typing `export` everytime.

## License
MIT License.
