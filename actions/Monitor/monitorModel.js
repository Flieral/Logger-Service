var monitorModel = require('../../logic/monitorModel');

var Input =
{	
	UserToken:
	{
		required: true
	},

	monitorHashID:
	{
		required: true
	}
}

exports.monitorModel =
{
	name: "monitorModel",
	description: "Get Monitor Model JSON",
	inputs: Input,

	run: function(api, data, next)
	{
		monitorModel
		(
			data.params.UserToken,
			data.params.monitorHashID,
			function (error, result)
			{
				if (error)
				{
					data.response.error = error.error;
					next(error);
				}
				else
				{
					data.response.result = result.result;
					next();
				}
			}
		);
	}
};