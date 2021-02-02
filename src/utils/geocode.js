const request = require('request')

const geocode = (address, callback) => {

    //encodeURIComponent is needed when address contain special character
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic29sYW5raXJpbmEiLCJhIjoiY2traml2MXJnMGd5YjJwczdqd3E3a3V5bSJ9.768JSdkvfdkIRL5aFH4ooA&limit=1'

    /*request({
        url: url,
        json: true
    }, (error, response) => {

        if (error) {
            callback('Unable to connect to location services!', undefined);

        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)

        } else {

            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name

            })
        }
    })*/


    request({
        url,
        json: true
    }, (error, {
        body
    }) => {

        if (error) {
            callback('Unable to connect to location services!', undefined);

        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)

        } else {

            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
    })
}


module.exports = geocode
