var payloadCheck = require('../config/payloadCheck.json')
var config = require('../config/configuration.json')

module.exports = {
  requiredCheck: function(body, callback){
    var peyKeys = Object.keys(payloadCheck)
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
      switch (payloadCheck[bodyKeys[i]].type)
      {
        case "int":
        callback(null, parseInt(body[bodyKeys[i]]))
        case "double":
        callback(null, parseFloat(body[bodyKeys[i]]))
        default:
        callback(null, body[bodyKeys[i]])
      }
    }
  },

  validator: function(body, callback){
    var bodyKeys = Object.keys(body)
    for (var i = 0; i < bodyKeys.length; i++){
      if (!payloadCheck[bodyKeys[i]])
      callback(New Error(bodyKeys[i] + "Key does not exist"), null)
    }
  }
}
