var express = require('express');
var app = express();
require('controllers-js')(app);

app.controllers();

var port = process.env.PORT || 8080;
app.listen(port);

console.log("Listening on port " + port);
