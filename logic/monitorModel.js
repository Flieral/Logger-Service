var request 		= require('request')
var configuration 	= require('../config/configuration.json');
var utility			= require('../logic/utility')

module.exports = function(userToken, monitorHashID, callback)
{
	var dict = {
		"UserToken" : userToken,
		"Key"		: monitorHashID
	}
	var queryString = utility.generateQueryString(dict)
	var url = configuration.BaseURL + 'Database/RHash/GetAll?' + queryString
	request
	(
		{
			method: 'GET',
			uri: url
		},
		function (error, response, body)
		{
			// body is the decompressed response body
			if (!error && response.statusCode === 200)
				callback(null, JSON.parse(body))				
			else
				callback(new Error(JSON.parse(body).error), null)
		}
	)
	.on
	(
		'error',
		function(err)
		{
			callback(err, null);
		}
	)
}