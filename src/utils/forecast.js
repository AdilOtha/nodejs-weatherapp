const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/834615fa6eef2dbd677d1b04f2b521d8/" + lat + "," + long + "?units=si&";
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to server!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            //console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + " It is currently "+ body.currently.temperature+ " degrees out.<br>Today's Highest Temperature:"+body.daily.data[0].temperatureHigh+"<br>Today's Lowest Temperature:"+body.daily.data[0].temperatureLow+"<br>There is a "+ body.currently.precipProbability+" % chance of rain");
        }

    })
}

module.exports = forecast;