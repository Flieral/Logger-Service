var monitorList = require('../../logic/monitorListLogic')

var Input = {
	accountHashID: {
		required: true,
		validator: function(value, connection, actionTemplate) {},
		default: function(value, connection, actionTemplate) {return 0}
	},
	statusCode: {
		required: false,
		validator: function(value, connection, actionTemplate) {},
		default: function(value, connection, actionTemplate) {return 0}
	},
	action: {
		required: false,
		validator: function(value, connection, actionTemplate) {},
		default: function(value, connection, actionTemplate) {return 0}
	},
	serviceCaller: {
		required: false,
		validator: function(value, connection, actionTemplate) {},
		default: function(value, connection, actionTemplate) {return 0}
	},
	moduleCaller: {
		required: false,
		validator: function(value, connection, actionTemplate) {},
		default: function(value, connection, actionTemplate) {return 0}
	}
}

exports.monitorList = {
	name : 'monitorList',
	description : 'Get monitor List',
	inputs: Input,

	run: function(api, data, next) {
		var filter = {
			statusCode: data.params.statusCode,
			action: data.params.action,
			serviceCaller: data.params.serviceCaller,
			moduleCaller: data.params.moduleCaller
		}
		monitorList(api.redisClient, data.params.accountHashID, filter, function (err, replies) {
			if (err) {
				data.response.error = err.error
				next(err)
			}
			data.response.result = replies
			next()
		})
	}
}
