var index = exports = module.exports = {};

index.test = function(req, res) {
    // And are written in usual Express convention
    res.send("This is a catch all handler, and it is last as defined in the routing table.");
}
