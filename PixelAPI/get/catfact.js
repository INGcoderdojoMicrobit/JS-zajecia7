const fetch = require('node-fetch')

exports.path = "/catfact";

exports.execute = (req, res) => {
    fetch('https://catfact.ninja/fact')
        .then(res => res.json())
        .then((out) => {
            res.send({ok: false, fact: out.fact, lenght: out.length});
        });
};