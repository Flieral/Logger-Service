var payloadChecker  = require('../../public/payloadChecker')
var monitorModelEntryLogic = require('../../logic/monitorModelEntryLogic')

var Input = {
  accountHashID: {
    required : true
  }
}

exports.monitorModelEntry = {
  name: "monitorModelEntry",
  description: "Post Log",
  inputs: Input,

  run: function(api, data, next) {
    var payload = JSON.parse(JSON.stringify(data.connection.rawConnection.params.body))
    monitorModelEntryLogic(api.redisClient, data.params.accountHashID, payload, function(err, replies) {
      if (err) {
        data.response.error = err.error
        next(err)
      }
      else {
        data.response.result = replies
        next()
      }
    })
  }
}
