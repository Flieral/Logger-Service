var monitorListDeleteAction = require('../../logic/monitorListDeleteAction')

var Input = {
  accountHashID: {
    required : true
  },
  statusCode: {
    required: false,
    validator: function(value, connection, actionTemplate) {},
    default: function(value, connection, actionTemplate) {}
  },
  action: {
    required: false,
    validator: function(value, connection, actionTemplate) {},
    default: function(value, connection, actionTemplate) {}
  },
  serviceCaller: {
    required: false,
    validator: function(value, connection, actionTemplate) {},
    default: function(value, connection, actionTemplate) {}
  },
  moduleCaller: {
    required: false,
    validator: function(value, connection, actionTemplate) {},
    default: function(value, connection, actionTemplate) {}
  }
}

exports.monitorListDelete = {
  name: 'monitorListDelete',
  description: 'Delete Monitor Model List',
  inputs: Input,

  run: function (api, data, next) {
    var filter = {
      statusCode: data.params.statusCode,
      action: data.params.action,
      serviceCaller: data.params.serviceCaller,
      moduleCaller: data.params.moduleCaller
    }
    monitorListDeleteAction(data.params.accountHashID, filter, function (err, replies) {
      if (err) {
        data.response.error = err.error
        next(err)
      }
      data.response.result = replies
      next()
    })
  }
}
