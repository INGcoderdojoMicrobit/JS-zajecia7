const https = require('https');
const http = require('http');
const request = require('request');

const Reddit = require("@cxllm/reddit");
const MEME_SUBREDDITS = ["dankmemes", "wholesomememes"];
const kaomoji = [
    '(*^ω^)',
    '(◕‿◕✿)',
    '(◕ᴥ◕)',
    'ʕ•ᴥ•ʔ',
    'ʕ￫ᴥ￩ʔ',
    '(*^.^*)',
    'owo',
    'OwO',
    '(｡♥‿♥｡)',
    'uwu',
    'UwU',
    '(*￣з￣)',
    '>w<',
    '^w^',
    '(つ✧ω✧)つ',
    '(/ =ω=)/',
];
//npm i node-fetch
const fetch = require('node-fetch');

let OWMAPPID = "dea49c5dbe5ecf2f3b3d6ed074766ee2";
let accuAPIID = "MOVo4OIH5KgNohU1JXHgHI2J7pMHB3Io";
let NASAAPPID = "Nzei0jlJaiJzcmlX5vxdCRB3TOMBFEazgudEUn32";
let sWynik="";
const NASA_API_KEY = "DEMO_KEY";

let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomBunny = () => {
    request(`https://api.bunnies.io/v2/loop/random/?media=gif`, (err, res, body) => {
        if (err) throw err;
        let json = JSON.parse(body);
        console.log(json.media.gif);
    });
};

let wikiSearch = (query, limit) => {
    request(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURI(query)}&limit=${limit || 10}`, (err, res, body) => {
        if (err) throw err;
        let json = JSON.parse(body);
        let output = [];
        output[0] = json[1];
        output[1] = json[3];
        for (let i = 0; i < output[0].length; i++) {
            console.log(`${output[0][i]} => ${output[1][i]}`)
        }
        //console.log(output);
    })
}

let IP = () => {
    //https://api.ipify.org/?format=json
    fetch(`https://api.ipify.org/?format=json`).then(res => res.json())
    .then((out) => {
        console.log(`IP: ${out.ip}`);
    });
};

let earth = () => {
    let earth_link = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`

    fetch(earth_link)
    .then(res => res.json())
    .then((out) => {
        let earth_output = out;

        let randomNumber = getRandomNumber(0, earth_output.length - 1)
        let image_name = earth_output[randomNumber].image

        let date = earth_output[randomNumber].date;
        let date_split = date.split("-")

        let year = date_split[0];

        let month = date_split[1];

        let day_and_time = date_split[2];
        let sliced_date = day_and_time.slice(0, 2);

        let image_link = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png";
        console.log(`${image_link}`)
        console.log(`${earth_output[randomNumber].caption} on ${date}`)
        GoogleTranslate(earth_output[randomNumber].caption,"en","pl")
    });
};


function GoogleTranslate(sTekst, sSourceLang, sTargetLang){

    /*https.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sSourceLang}&tl=${sTargetLang}&dt=t&q="${encodeURI(sTekst)}`, (resp) => {

    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
            //console.log(data);
            let oWynik = JSON.parse(data);
            oWynik[0].forEach(element => {
                console.log(element[0])
            });
            //console.log(oWynik);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });*/

    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sSourceLang}&tl=${sTargetLang}&dt=t&q="${encodeURI(sTekst)}`)
    .then(res => res.json())
    .then((out) => {
            //console.log(data);
            let oWynik = out;
            oWynik[0].forEach(element => {
                console.log(element[0])
            });
            //console.log(oWynik);
    })
}

let redditMeme = async () => {
    let random = await MEME_SUBREDDITS[
        Math.floor(Math.random() * MEME_SUBREDDITS.length)
    ];
    
    let meme = await Reddit.top(random)
    
    while(meme.nsfw) meme = await Reddit.top(random);

    console.log(`Autor: ${meme.author}\n${meme.title}\n${meme.image}\n${meme.url}\n${meme.upvotes} 👍, ${meme.downvotes} 👎}`)
};

let owoify = (str) => {
    str = str.replace(/(?:l|r)/g, 'w');
    str = str.replace(/(?:L|R)/g, 'W');
    str = str.replace(/n([aeiou])/g, 'ny$1');
    str = str.replace(/N([aeiou])|N([AEIOU])/g, 'Ny$1');
    str = str.replace(/ove/g, 'uv');
    str = str.replace(/nd(?= |$)/g, 'ndo');
    str = str.replace(
        /!+/g,
        ` ${kaomoji[Math.floor(Math.random() * kaomoji.length)]}`
    );

    return str;
}

console.log('===królik===')
randomBunny();
console.log('===wiki===')
wikiSearch('Królik');
console.log('===nasa===')
earth();
console.log('===ip===')
IP();
console.log('===reddit===')
redditMeme();
console.log('===owoify===')
owoify('Hello World!');




// https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${cityID}?apikey=${accuAPIID}&language=pl&metric=true
// console.log(`AccuWeather-> temp:${o1hForecast[0].Temperature.Value}°${o1hForecast[0].Temperature.Unit}, link: ${o1hForecast[0].MobileLink}`);
// console.log(`AccuWeather-> icon: https://www.accuweather.com/images/weathericons/${o1hForecast[0].WeatherIcon}.svg`);
        

//https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sSourceLang}&tl=${sTargetLang}&dt=t&q="${encodeURI(sTekst)}

//https://api.nasa.gov/planetary/earth/assets?lon=18.947329&lat=50.193520&date=2021-04-10&dim=0.20&api_key=${NASAAPPID}

// https://api.nasa.gov/planetary/apod?api_key=${NASAAPPID}

//https://api.thingspeak.com/channels/730056/feeds.json

//https://freegeoip.app/json/

//https://restcountries.eu/#api-endpoints-all    
//https://restcountries.eu/rest/v2/name/${sName}
//https://restcountries.eu/rest/v2/all

//https://openlibrary.org/dev/docs/api/books   
//https://openlibrary.org/isbn/${sISBN}.json

//https://api.ipify.org/?format=json

//https://ipinfo.io/161.185.160.93/geo    

//http://api.zippopotam.us/pl/40-748
//http://www.zippopotam.us/
//http://api.zippopotam.us/${sKraj}/${sKodPoczt}

//https://www.boredapi.com/
//https://www.boredapi.com/api/activity?participants=1
//https://www.boredapi.com/api/activity?participants=${iIleOsob}

 //https://api.publicapis.org/entries
 // Amogus