const { NASA_API_KEY } = require("../config.json");
const fetch = require('node-fetch')

const randomnumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.path = "/earth";

exports.execute = (req, res) => {
    fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`)
        .then((res) => res.json())
        .then((out) => {
            let earth_output = out;
            //0, earth_output.length - 1
            let randomNumber = randomnumber(0, earth_output.length - 1);
                
            let image_name = earth_output[randomNumber].image;

            let date = earth_output[randomNumber].date;
            let date_split = date.split("-");

            let year = date_split[0];

            let month = date_split[1];

            let day_and_time = date_split[2];
            let sliced_date = day_and_time.slice(0, 2);

            res.send({
                ok: true,
                image: {
                    png: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/${image_name}.png`,
                },
                caption: earth_output[randomNumber].caption,
                date: date,
            });
        });
};
