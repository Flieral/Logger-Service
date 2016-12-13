var payloadCheck  = require('../config/payloadCheck.json')
var configuration = require('../config/configuration.json')

module.exports = {
  requiredCheck: function(body, callback) {
    var peyKeys = Object.keys(payloadCheck.monitorModelEntry)
    for (var i = 0; i < peyKeys.length; i++) {
      if (payloadCheck[peyKeys[i]].required && !body[peyKeys[i]]) {
        callback(new Error(peyKeys[i] + configuration.message.keyRequiredError))
      }
    }
  },

  formatter: function(body, callback) {
    var bodyKeys = Object.keys(body)
    for (var i = 0; i < bodyKeys.length; i++) {
      switch (payloadCheck.monitorModelEntry.[bodyKeys[i]].type)
      {
        case 'int':
        body[bodyKeys[i] = parseInt(body[bodyKeys[i]]))
        break
        case 'double':
        body[bodyKeys[i] = parseFloat(body[bodyKeys[i]]))
        break
      }
    }
    callback(null, body)
  },

  validator: function(body, callback) {
    var bodyKeys = Object.keys(body)
    for (var i = 0; i < bodyKeys.length; i++) {
      if (!payloadCheck.monitorModelEntry[bodyKeys[i]])
        callback(new Error(bodyKeys[i] + ' ' + configuration.message.missingKey), null)
      if(payloadCheck.monitorModelEntry[bodyKeys[i]].enum)
      {
        var validate = false
        var enums = Object.keys(configuration.TableMonitorModel[payloadCheck.monitorModelEntry[bodyKeys[i]].enum])
        for(var j = 0; j < enums.lenght; j++)
          if(enums[j] === body[bodyKeys[i]])
            validate = true
      }
      if(!validate)
        callback(new Error(configuration.message.validator.failed), null)
    }
  },

  startChecking: function(body, finalCallback) {
    this.requiredCheck(body, function(error) {
      if(error)
        finalcallback(error, null)
    })
    this.validator(body, function(error) {
      if(error)
        finalcallback(error, null)
    })
    this.formatter(body, function(error, result) {
      if(error)
        finalcallback(error, null)
      finalCallback(null, result)
    })
  }
}
