const request = require('request')


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWRpbG90aGEiLCJhIjoiY2s2dnY4ZW5wMDFnejNucW9ncnF2c3hwcyJ9.-NzSatK_aFkiLpKXsd6BAA&limit=1";
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to server!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }

    })
}

// geocode('New York', (error, data) => {
//     console.log(error)
//     console.log(data)
// })

module.exports = geocode;