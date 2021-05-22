const {port, klucz} = require('../config.json');
const request = require('request');


function fetch(offices) {
    return new Promise(function (resolve, reject) {
        let result;

        let response = request(`https://api.fbi.gov/wanted/v1/list`, params ={
            'field_offices': `${office}`
        });
        let data = JSON.parse(response.content);
        console.log(data['total']);
    });
}

exports.execute = async function (req, res) {
    fetch('miami');
};