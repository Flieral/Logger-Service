var monitorListLogic = require('../../logic/monitorListLogic')

var Input = {
	accountHashID: {
		required: true,
		validator: function(value, connection, actionTemplate) {return true}
	},
	statusCode: {
		required: false,
		validator: function(value, connection, actionTemplate) {return true}
	},
	actionType: {
		required: false,
		validator: function(value, connection, actionTemplate) {return true}
	},
	serviceCaller: {
		required: false,
		validator: function(value, connection, actionTemplate) {return true}
	},
	moduleCaller: {
		required: false,
		validator: function(value, connection, actionTemplate) {return true}
	}
}

exports.monitorList = {
	name : 'monitorList',
	description : 'Get monitor List',
	inputs: Input,

	run: function(api, data, next) {
		var filter = {}
		if (data.params.statusCode)
		filter.statusCode = data.params.statusCode
		if (data.params.actionType)
		filter.actionType = data.params.actionType
		if (data.params.serviceCaller)
		filter.serviceCaller = data.params.serviceCaller
		if (data.params.moduleCaller)
		filter.moduleCaller = data.params.moduleCaller

		monitorListLogic(api.redisClient, data.params.accountHashID, filter, function (err, replies) {
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
