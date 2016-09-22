
var Input =
{	
	UserToken:
	{
		required: false
	}
}

exports.monitorList =
{
	name: "monitorList",
	description: "Get Monitor Model JSON",
	inputs: Input,

	run: function(api, data, next)
	{
		data.response.result = "This Is Mohamamd:)";
		next();
	}
};