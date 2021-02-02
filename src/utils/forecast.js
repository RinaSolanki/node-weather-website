const request = require('request')

const forecast = (latitude, longitude, callback) => {

   // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
   const url = 'http://api.weatherstack.com/current?access_key=108139ae66ef28489b531f77e3d4a365&query=' + latitude + ',' + longitude
/*
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (response.body.error) {
            callback('Unable to find', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain')
        }
    })
*/
    
        request({
        url,      //shorthand syntax
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find', undefined)
        } else {
           callback(undefined,'It is currently ' + body.current.temperature + ' degress out.')
        }
    })


}


module.exports = forecast
