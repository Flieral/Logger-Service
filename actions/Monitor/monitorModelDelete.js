var monitorModelDeleteAction = require('../../logic/monitorModelDeleteLogic')

var Input = {
  accountHashID: {
    required : true
  },
  monitorHashID: {
    required: true
  }
}

exports.monitorModelDelete = {
  name: 'monitorModelDelete',
  description: 'Delete Monitor Model',
  inputs: Input,

  run: function (api, data, next) {
    monitorChecker(api.redisClient, data.params.accountHashID, data.params.monitorHashID, function (err, replies) {
      if (err) {
        data.response.error = err.error
        next(err)
      }
      else {
        monitorModelDeleteAction(api.redisClient, data.params.accountHashID, data.params.monitorHashID, function (err, replies) {
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
    })
  }
}
