var payloadChecker = require('../../logic/payloadChecker')
var monitorModelEntryAction = require('../../logic/monitorModelEntryAction')

exports.monitorModelEntry = {
  name: "monitorModelEntry",
  description: "Post Log",

  run: function(api, data, next) {
    var payload = JSON.parse(JSON.stringify(data.connection.rawConnection.params.body))
    payloadChecker.startChecking(payload, function(error, result) {
      if (error) {
        data.response.error = error.error
        next(error)
      }
      monitorModelEntryAction(playload, function(error, result) {
        if (error) {
          data.response.error = error.error
          next(error)
        }
        data.response.result = result
      })
    })
  }
}
