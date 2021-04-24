exports.path = "/date";

exports.execute = (req, res) => {
    let data = new Date();
    res.send({
        ok: true,
        dayOfWeek: data.getUTCDay(),
        day: data.getUTCDate(),
        month: data.getUTCMonth() + 1, //miesiące są liczone od 0 do 11, więc musimy dodać 1
        year: data.getUTCFullYear(),
    });
};