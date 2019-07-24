const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cb50be440427f5fc5fe6807786c66b04/'+ latitude + ',' + longtitude
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the service', undefined)
        } else if(body.error) {
            callback('The latitude and longtitude are not correct!', undefined)
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precip: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast