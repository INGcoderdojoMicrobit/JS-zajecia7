exports.path = "/echo";

exports.execute = (req, res) => {
    res.send(JSON.stringify(req.query));
};