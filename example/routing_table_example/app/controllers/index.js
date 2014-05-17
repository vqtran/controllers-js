var index = exports = module.exports = {};

index.get = function(req, res) {
    // And are written in usual Express convention
    res.send("Hello world!");
}

index.query = function(req,res) {
    var message = req.params['message'];
    res.send(message);
}
