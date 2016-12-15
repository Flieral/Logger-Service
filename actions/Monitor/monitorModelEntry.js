var payloadChecker  = require('../../public/payloadChecker')
var monitorModelEntryLogic = require('../../logic/monitorModelEntryLogic')

exports.monitorModelEntry = {
  name: "monitorModelEntry",
  description: "Post Log",

  run: function(api, data, next) {
    var payload = JSON.parse(JSON.stringify(data.connection.rawConnection.params.body))
    console.log("body parse shod!!!!");
    //payloadChecker.startChecking(payload, function(err, replies) {
      //if (err) {
        //data.response.error = err.error
        //next(err)
      //}
      monitorModelEntryLogic(payload, function(err, replies) {
        if (err) {
          data.response.error = err.error
          next(err)
        }
        data.response.result = replies
        next()
      })
    //})
  }
}
