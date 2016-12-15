var monitorModelAction = require('../../logic/monitorModelLogic')

var Input = {
	monitorHashID: {
		required: true
	}
}

exports.monitorModel = {
	name: "monitorModel",
	description: "Get Monitor Model JSON",
	inputs: Input,

	run: function(api, data, next) {
		monitorModelAction(api.redisClient, data.params.monitorHashID, function (err, replies) {
			if (err) {
				data.response.error = err.error
				next(err)
			}
			data.response.result = replies
			next()
		})
	}
}
