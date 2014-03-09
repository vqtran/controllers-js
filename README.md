Controllers.js
==============

Simply adding MVC-style controllers to Express.js.
Write your controllers in separate files, call app.controllers() and all of their routes and handlers will automatically attached to the app. 

Patches the Express app to support app.controllers() which loads all controller files in a specified directory, or if not defaults to `app/controllers/`.

## Installation & Usage
`npm install controllers-js` or add it to your package.json.
```
var express = require('express');
var app = express();
require('controllers-js')(app);

app.configure(function () {
    /* your middleware, but position doesn't really matter. */
    ...
    app.controllers();
});

var port = process.env.PORT || 8080;
app.listen(port);
```
It also takes a specific controllers directory path: `app.controllers({path: '/directory'})`

## How to Write Controllers

Controller files belong at the root of the controllers directory path.

For example, let's say we have a Controller for Index called `index.js`.
Its path would be `/specified/controller/path/index.js`. 

All .js files in `/specified/controller/path` will be loaded.

All controllers do their own routing, and provide the handlers for these routes.

Ex: `/specfied/controller/path/index.js`
```
var index = exports = module.exports = {};

// Special routes object used in controller-js
index.routes = {
    get: { action: 'get', path: '/' },
    query: { action: 'get', path: '/:message' }
};

// Handler functions match up with the route keys
index.get = function(req, res) {
    // And are written in usual Express convention
    res.send("Hello world!");
}

index.query = function(req,res) {
    var message = req.params['message'];
    res.send(message);
}
```

The exported routes object contains keys corresponding to the exported handler functions, and are mapped to an object with the fields `action` and `path`. `action` specifies the HTTP verb, as if you would call app.get or app.post. `path` specifies the routing path to serve this request, in the same format as you would call in `app.get("/", function)`.

## License
MIT License.
