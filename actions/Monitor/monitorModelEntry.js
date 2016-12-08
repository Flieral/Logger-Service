var monitorModelEntry = require('../../logic/payloadChecker')
exports.monitorModelEntry = {
  name: "monitorModelEntry",
  description: "Post Log"
  run: function(api, data, next){
    var payload = JSON.parse(JSON.stringify(data.connection.rawConnection.params.body))
    startChecking(payload, function(error, result){
      if (error) {
        data.response.error = error.error
        next(error)
      }
      else{
        monitorModelEntry(playload)
      }
    })
  }
}
