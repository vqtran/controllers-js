var express = require('express');
var app = express();
var controllers = require('../../index.js')();

app.use(controllers);

app.get("*", function (req, res) {
   res.send("No controllers matched this.");
});

var port = process.env.PORT || 8080;
app.listen(port);

console.log("Listening on port " + port);
