exports.path = "/randomnumber";

exports.execute = (req, res) => {
    if (!req.query.min)
        return res.send({ ok: false, message: "Podaj argument min" });
    if (!req.query.max)
        return res.send({ ok: false, message: "Podaj argument max" });

    let min = parseInt(req.query.min);
    let max = parseInt(req.query.max);
    res.send({
        ok: true,
        result: Math.floor(Math.random() * (max - min + 1)) + min
    });
};
