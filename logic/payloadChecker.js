var payloadCheck = require('../config/payloadCheck.json')
var config = require('../config/configuration.json')

module.exports = {

  requiredCheck: function(body, callback){
    var peyKeys = Object.keys(payloadCheck.monitorModelEntry)
    for (var i = 0; i < peyKeys.length; i++){
      if (payloadCheck[peyKeys[i]].required && !body[peyKeys[i]]){
        callback(New Error(peyKeys[i] + config.message.keyRequiredError))
      }
    }
  },

  formatter: function(body, callback){
    var bodyKeys = Object.keys(body)
    for (var i = 0; i < bodyKeys.length; i++)
    {
      switch (payloadCheck.monitorModelEntry.[bodyKeys[i]].type)
      {
        case "int":
        body[bodyKeys[i] = parseInt(body[bodyKeys[i]]))
        break
        case "double":
        body[bodyKeys[i] = parseFloat(body[bodyKeys[i]]))
        break
      }
    }
    callback(null,body)
  },

  validator: function(body, callback){
    var bodyKeys = Object.keys(body)
    for (var i = 0; i < bodyKeys.length; i++){
      if (!payloadCheck.monitorModelEntry.[bodyKeys[i]])
      callback(New Error(bodyKeys[i] + "Key does not exist"), null)
    }
  }

  startChecking: function(body, finalCallback){
    this.requiredCheck(body, func(error){
      finalcallback(error, null)
    })
    this.validator(body, func(error){
      finalcallback(error, null)
    })
    this.formatter(body, func(error, result){
      finalcallback(error, result)
    })
  }
}
