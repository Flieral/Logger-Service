var configuration 	= require('../config/configuration.json')
var requestHandler 	= require('./requestHandler')

module.exports = 
{
	/* Add Value to Set Table */
	createKeyModel: function(userToken, tableName, value)
	{
		var values = [value]
		var innerDict = { "Values" : values }
		var encodedValues = utility.base64Encoding(innerDict.toString())
		var dict = {
			"UserToken"	: userToken,
			"Key"		: tableName,
			"Value"		: encodedValues
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RList/PUSH?' + queryString
		return requestHandler(url)
	}
}