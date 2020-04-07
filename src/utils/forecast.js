const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e595fd5bc19c8b22164c8e1e511e396b&query=' + address
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect Weather service', undefined)
        } else if (body.error) {
            callback('Unable to Find Location', undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature
            })
        }
    })
}
module.exports = forecast