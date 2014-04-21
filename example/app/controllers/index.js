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
