var monitorModelAction = require('../../logic/monitorModelLogic')
var monitorChecker = require('../../logic/monitorChecker')

var Input = {
	accountHashID: {
		require: true
	},
	monitorHashID: {
		required: true
	}
}

exports.monitorModel = {
	name: "monitorModel",
	description: "Get Monitor Model JSON",
	inputs: Input,

	run: function (api, data, next) {
		monitorChecker(api.redisClient, data.params.accountHashID, data.params.monitorHashID, function (err, replies) {
			if (err) {
				data.response.error = err.error
				next(err)
			}
			else {
				monitorModelAction(api.redisClient, data.params.monitorHashID, function (err, replies) {
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
