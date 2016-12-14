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

  run: function(api, data, next) {
    monitorModelDeleteAction(data.accountHashID, data.monitorHashID, function (err, replies) {
      if (err) {
        data.response.error = err.error
        next(err)
      }
      data.response.result = replies
      next()
    })
  }
}
