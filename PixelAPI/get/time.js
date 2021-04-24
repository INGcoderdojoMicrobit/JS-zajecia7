exports.path = "/time";

exports.execute = (req, res) => {
    let gmt = parseInt(req.query.gmt) || 0;
    let data = new Date();
    res.send({
        ok: true,
        time: `${data.getUTCHours() + gmt}:${data.getUTCMinutes() + gmt}:${
            data.getUTCSeconds() + gmt
        }`,
        hours: data.getUTCHours() + gmt,
        minutes: data.getUTCMinutes() + gmt,
        seconds: data.getUTCSeconds() + gmt,
        miliseconds: data.getUTCMilliseconds() + gmt,
    });
};