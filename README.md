controllers-js
==============
Simply adding MVC-style controllers to Express.js.
## Install
```
$ npm install controllers-js
```
or add it to your `package.json` and ```
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
require('controllers-js')(app);

app.configure(function () {
    /* your middleware goes here */
    ...
    app.controllers();
});

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

## Documentation

####`app.controllers(option)`
This method is patched onto Express' normal app object. By default this will look for controller files in the root level of `app/controllers`. If `option['path']` is specified, it will look in this directory instead.

### Controllers
A controller exports `routes` and each route handler.
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
