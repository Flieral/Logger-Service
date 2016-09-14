var request	= require('request')

module.exports = function(url)
{
	console.log('url: ' + url)
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
				return JSON.parse(body)
			else
				return new Error(JSON.parse(body).error)
		}
	)
	.on
	(
		'error',
		function(err)
		{
			return err
		}
	)
}