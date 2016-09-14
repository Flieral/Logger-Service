var configuration 	= require('../config/configuration.json')
var requestHandler 	= require('./requestHandler')

module.exports = 
{
	/* Add Member to Set Table */
	createKeyModel: function(userToken, tableName, member)
	{
		var dict = {
			"UserToken"	: userToken,
			"Key"		: tableName,
			"Member"	: member
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RSet/Add?' + queryString
		return requestHandler(url)
	}
}