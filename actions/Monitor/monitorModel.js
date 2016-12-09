var monitorModelAction = require('../../logic/monitorModelAction')

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
		monitorModelAction(data.params.monitorHashID, function (error, result) {
				if (error) {
					data.response.error = error.error
					next(error)
				}
				data.response.result = result
				next()
			}
		)
	}
}
