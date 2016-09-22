
var Input =
{	
	UserToken:
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
		data.response.result = "This Is Mohamamd:)";
	}
};