const fetch = require('node-fetch');

exports.path = "/howtonamethisapi";

exports.execute = (req, res) => {
    try {
        if (!req.query.name) return res.send({ok: false, message: 'Podaj argument name z imieniem i nazwiskiem'});
        let name = req.query.name;
        let data = {};
        fetch(`https://api.diversitydata.io/?fullname=${name}`)
        .then((res1) => res1.json())
        .then((out1) => {
            data.gender = {};
            data.gender.gender = out1.gender;
            data.gender.probability = parseFloat(out1['gender probability']) * 100;
            fetch(`https://api.agify.io/?name=${name.split(' ')[0]}`)
            .then((res2) => res2.json())
            .then((out2) => {
                data.age = out2.age;
                fetch(`https://api.nationalize.io/?name=${name.split(' ')[0]}`)
                .then((res3) => res3.json())
                .then((out3) => {
                    data.country = out3.country;
                    res.send({ok: true, results: data});
                });
            });
        });
    }
    catch (ex) {
        console.error(ex);
        res.status(500).send({ok: false, status: 500});
    }
};