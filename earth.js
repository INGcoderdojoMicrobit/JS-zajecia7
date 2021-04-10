//skrypt do pobierania zdjęcia Ziemii zrobiony przez Pixela
const fetch = require('node-fetch');
const NASA_API_KEY = 'DEMO_KEY'
var earth_link = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

fetch(earth_link)
.then(res => res.json())
.then((out) => {
    var earth_output = out;

    var randomNumber = getRandomNumber(0, earth_output.length - 1)
    var image_name = earth_output[randomNumber].image

    var date = earth_output[randomNumber].date;
    var date_split = date.split("-")

    var year = date_split[0];

    var month = date_split[1];

    var day_and_time = date_split[2];
    var sliced_date = day_and_time.slice(0, 2);

    var image_link = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png";

    console.log(`${earth_output[randomNumber].caption} on ${date}`);
    console.log(image_link);
});