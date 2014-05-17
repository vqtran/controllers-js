var express = require('express');
var app = express();
var Controllers = require('../../index.js');

var controllers = Controllers({table: __dirname + "/routes.json"});

app.use(controllers);

var port = process.env.PORT || 8080;
app.listen(port);

console.log("Listening on port " + port);
