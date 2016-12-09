var monitorModelDeleteAction = require('../../logic/monitorModelDeleteAction')

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

  run: function(api, data, next) {
    monitorModelDeleteAction(data.accountHashID, data.monitorHashID, function (error, result) {
      if (error) {
        data.response.error = error.error
        next(error)
      }
      data.response.result = result
      next()
    })
  }
}
